import Joi from 'joi';

export const createHistorySchema = Joi.object({
    user_id: Joi.number().integer().required(),
    entity_type: Joi.string().max(50).required(),
    entity_id: Joi.number().integer().required(),
    field_name: Joi.string().max(255).required(),
    old_value: Joi.string().max(500).allow(null),
    new_value: Joi.string().max(500).allow(null),
});

export const updateHistorySchema = Joi.object({
    user_id: Joi.number().integer().optional(),
    entity_type: Joi.string().max(50).optional(),
    entity_id: Joi.number().integer().optional(),
    field_name: Joi.string().max(255).optional(),
    old_value: Joi.string().max(500).allow(null).optional(),
    new_value: Joi.string().max(500).allow(null).optional(),
});
