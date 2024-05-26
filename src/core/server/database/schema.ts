import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid';

export const PumpStates = sqliteTable('pump_states', {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  autoManual: int('auto_manual').default(0).notNull(),
  pump1: int('pump1').default(0).notNull(),
  pump2: int('pump2').default(0).notNull(),
  pump3: int('pump3').default(0).notNull(),
  alarm: int('alarm').default(0).notNull(),
  cisternLevel: int('cistern_level').default(0).notNull(),
  superiorTankLevel: int('superior_tank_level').default(0).notNull(),
  ib1: int('ib1').default(0).notNull(),
  ib2: int('ib2').default(0).notNull(),
  ib3: int('ib3').default(0).notNull(),
  lad: int('lad').default(0).notNull(),
  pump1State: text('pump1_state').default('off').notNull(),
  pump2State: text('pump2_state').default('off').notNull(),
  pump3State: text('pump3_state').default('off').notNull(),
  al: text('al').default('off').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})
