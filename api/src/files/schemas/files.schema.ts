import Joi from 'joi';

export const createFileSchema = Joi.object({
    original_name: Joi.string().max(255).required(),
    storage_name: Joi.string().max(255).required(),
    mime_type: Joi.string().max(128).required(),
    size: Joi.number().integer().required(),
    url: Joi.string().max(500).required(),
});

export const updateFileSchema = Joi.object({
    original_name: Joi.string().max(255).optional(),
    storage_name: Joi.string().max(255).optional(),
    mime_type: Joi.string().max(128).optional(),
    size: Joi.number().integer().optional(),
    url: Joi.string().max(500).optional(),
});
