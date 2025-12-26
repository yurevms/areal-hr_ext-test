import Joi from 'joi';

export const createEmployeeSchema = Joi.object({
    last_name: Joi.string().max(50).required(),
    first_name: Joi.string().max(50).required(),
    patronymic: Joi.string().max(50).optional().allow(null),

    birth_date: Joi.date().iso().required(),

    pasport_series: Joi.string().length(4).required(),
    pasport_number: Joi.string().length(6).required(),
    pasport_date_of_issue: Joi.date().iso().required(),
    pasport_unit_code: Joi.string().max(7).required(),
    pasport_issued_by: Joi.string().max(255).required(),

    address_area: Joi.string().max(255).required(),
    address_city: Joi.string().max(255).required(),
    address_street: Joi.string().max(255).required(),
    address_house: Joi.string().max(50).required(),
    address_building: Joi.string().max(50).optional().allow(null),
    address_apartment: Joi.string().max(50).optional().allow(null),
});

export const updateEmployeeSchema = Joi.object({
    last_name: Joi.string().max(50).optional(),
    first_name: Joi.string().max(50).optional(),
    patronymic: Joi.string().max(50).optional().allow(null),

    birth_date: Joi.date().iso().optional(),

    pasport_series: Joi.string().length(4).optional(),
    pasport_number: Joi.string().length(6).optional(),
    pasport_date_of_issue: Joi.date().iso().optional(),
    pasport_unit_code: Joi.string().max(7).optional(),
    pasport_issued_by: Joi.string().max(255).optional(),

    address_area: Joi.string().max(255).optional(),
    address_city: Joi.string().max(255).optional(),
    address_street: Joi.string().max(255).optional(),
    address_house: Joi.string().max(50).optional(),
    address_building: Joi.string().max(50).optional().allow(null),
    address_apartment: Joi.string().max(50).optional().allow(null),
});
