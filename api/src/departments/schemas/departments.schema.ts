import Joi from 'joi';

export const createDepartmentSchema = Joi.object({
    organization_id: Joi.number().integer().required(),
    parent_id: Joi.number().integer().allow(null).optional(),
    name: Joi.string().max(255).required(),
    comment: Joi.string().max(500).required(),
});

export const updateDepartmentSchema = Joi.object({
    organization_id: Joi.number().integer().optional(),
    parent_id: Joi.number().integer().allow(null).optional(),
    name: Joi.string().max(255).optional(),
    comment: Joi.string().max(500).optional(),
});
