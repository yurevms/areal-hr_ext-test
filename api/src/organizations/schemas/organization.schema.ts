import Joi from 'joi';

export const createOrganizationSchema = Joi.object({
    name: Joi.string().max(255).required(),
    comment: Joi.string().max(500).required(),
});

export const updateOrganizationSchema = Joi.object({
    name: Joi.string().max(255).optional(),
    comment: Joi.string().max(500).optional(),
});
