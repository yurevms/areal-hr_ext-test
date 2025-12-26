import Joi from 'joi';

export const createPositionSchema = Joi.object({
    name: Joi.string().max(255).required(),
});

export const updatePositionSchema = Joi.object({
    name: Joi.string().max(255).optional(),
});
