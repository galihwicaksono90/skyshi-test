import { z } from "zod";

export const activitySchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string().datetime(),
});

export const activitiesSchema = z.object({
  total: z.number(),
  limit: z.number(),
  skip: z.number(),
  data: z.array(activitySchema),
});

export const todosSchema = activitySchema.extend({
  todo_items: z.array(
    z.object({
      activity_group_id: z.number(),
      id: z.number(),
      is_active: z.number(),
      priority: z.string(),
      title: z.string(),
    })
  ),
});

export const updateTodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  is_active: z.number(),
  priority: z.string(),
});

export const createResponseSchema = z.object({
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  id: z.number(),
  title: z.string(),
  email: z.string(),
});

export const todoSchema = z.object({
  activity_group_id: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  id: z.number(),
  is_active: z.number(),
  priority: z.string(),
  title: z.string(),
});

export const updateActivitySchema = z.object({
  id: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  title: z.string(),
  email: z.string(),
});
