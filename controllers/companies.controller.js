const { Op } = require("sequelize")
const { Company, CompanySource, CompanyStage, User } = require("../models");
const downloadCSV = require("../utils/csv")

// Get company service
const getCompanyService = (id) => {
  return Company.findOne({ 
    where: { id },
    include: [
      {
        model: CompanySource,
        as: "companySource",
        required: false,
        attributes: ["id", "name"]
      },
      {
        model: CompanyStage,
        as: "companyStage",
        required: false,
        attributes: ["id", "name"]
      }
    ]
  });
}

// Get company sources service
const getCompanySourcesService = () => {
  return CompanySource.findAll();
}

// Get company stages services
const getCompanyStagesService = () => {
  return CompanyStage.findAll();
}

const companiesController = {};

// Fetch all the companies.
companiesController.index = async (req, res, next) => {
  const { page, size, sort, dir, search } = req.query;

  let onPage = 1;
  if (page && +page > 1) {
    onPage = page;
  }

  let perPage = 10;
  if (size & size < 500) {
    perPage = size;
  }

  const skip = 0 + (onPage - 1) * perPage;

  let orderByColumn = "id";
  // List of columns that have support for the sorting.
  if (sort === "id" || sort === "name" || sort === "createdAt" || sort === "updatedAt") {
    orderByColumn = sort;
  }

  let orderDirection = "desc";
  if ( (dir && dir.toLowerCase() === "desc") || (dir && dir.toLowerCase() === "asc") ) {
    orderDirection = dir;
  }

  let whereClause = {}
  if (search) {
    whereClause["name"] = { [Op.like]: "%" + search + "%" }
  }

  try {
    const companies = await Company.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: CompanySource,
          as: "companySource",
          required: false,
          attributes: ["id", "name"]
        },
        {
          model: CompanyStage,
          as: "companyStage",
          required: false,
          attributes: ["id", "name"]
        },
        {
          model: User,
          as: "creator",
          attributes: ["id", "firstName", "lastName"]
        },
        {
          model: User,
          as: "updator",
          required: false,
          attributes: ["id", "firstName", "lastName"]
        }
      ],
      offset: skip,
      limit: perPage,
      order: [
        [orderByColumn, orderDirection]
      ]
    });

    // For navigation.
    let disablePrev = false;
    if (onPage === 1) {
      disablePrev = true;
    }
    let disableNext = false;
    if (onPage * perPage >= companies.count) {
      disableNext = true;
    }

    const data = { 
      title: "Companies", 
      companies: companies.rows, 
      count: companies.count, 
      disablePrev, 
      disableNext, 
      page: onPage, 
      size: perPage,
      sort: orderByColumn,
      dir: orderDirection,
      search
    };
    res.render("companies/index.view.html", { data });
  } catch (err) {
    next(err);
  }
};

// Download as csv file.
companiesController.download = async (req, res, next) => {
  const fields = [
    { label: "Id", value: "id" },
    { label: "Name", value: "name" },
    { label: "website", value: "website" },
    { label: "Source", value: "companySource.name" },
    { label: "Stage", value: "companyStage.name" },
    { label: "Created by", value: (row, field) => row.creator?.firstName + " " + row.creator?.lastName },
    { label: "Updated by", value: (row, field) => row.updator?.firstName + " " + row.updator?.lastName }
  ];

  try {
    const companies = await Company.findAndCountAll({
      include: [
        {
          model: CompanySource,
          as: "companySource",
          required: false,
          attributes: ["id", "name"]
        },
        {
          model: CompanyStage,
          as: "companyStage",
          required: false,
          attributes: ["id", "name"]
        },
        {
          model: User,
          as: "creator",
          attributes: ["id", "firstName", "lastName"]
        },
        {
          model: User,
          as: "updator",
          required: false,
          attributes: ["id", "firstName", "lastName"]
        }
      ],
      order: [
        ['id', 'desc']
      ]
    });

    downloadCSV(res, 'users.csv', fields, companies.rows);
    return
  } catch (err) {
    next(err);
  }
}

// Add company page.
companiesController.add = async (req, res, next) => {
  const sources = await getCompanySourcesService();
  const stages = await getCompanyStagesService();

  const data = { title: "Add new company", sources, stages };
  res.render("companies/add.view.html", { data });
}

// Edit company page.
companiesController.edit = async (req, res, next) => {
  const id = req.params.id;

  try {
    const company = await getCompanyService(id);
    const sources = await getCompanySourcesService();
    const stages = await getCompanyStagesService();

    const data = { title: "Edit this company", company, sources, stages }
    res.render("companies/edit.view.html", { data });
  } catch (err) {
    next(err);
  }
}

// Show company page.
companiesController.show = async (req, res, next) => {
  const id = req.params.id;

  try {
    const company = await getCompanyService(id);

    const data = { title: "Show this company", company };
    res.render("companies/show.view.html", { data });
  } catch (err) {
    next(err);
  }
}

// Create a new company.
companiesController.create = async (req, res, next) => {
  const { name, website, sourceId, stageId } = req.body;

  try {
    const company = await Company.create({
      name,
      website,
      active: 1,
      sourceId,
      stageId,
      createdBy: req.user.id
    }, {silent: true});

    res.redirect(`/companies/${company.id}`);
    return;
  } catch (err) {
    next(err);
  }
}

// Update an existing company.
companiesController.update = async (req, res, next) => {
  const id = req.params.id;
  const { name, website, sourceId, stageId } = req.body;

  try {
    const company = await getCompanyService(id);

    company.name = name;
    company.website = website;
    company.sourceId = sourceId;
    company.stageId = stageId;
    company.updatedBy = req.user.id;

    await company.save();

    res.redirect(`/companies/${company.id}`);
    return;
  } catch (err) {
    next(err);
  }
}

// Delete a company.
companiesController.destroy = async (req, res, next) => {
  const id = req.params.id;

  try {
    const company = await Company.destroy({ where: { id }});

    res.redirect("/companies");
    return;
  } catch (err) {
    next(err);
  }
}

module.exports = companiesController;