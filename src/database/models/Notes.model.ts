import { v4 as uuidv4 } from "uuid";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  Default,
  Index,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";

@Table({ tableName: "notes_details", timestamps: true })
export default class Notes extends Model<
  InferAttributes<Notes>,
  InferCreationAttributes<Notes>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Index
  declare name: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare content: string;

  @Attribute(DataTypes.DATE)
  @Default(DataTypes.NOW)
  declare createdAt?: Date;

  @Attribute(DataTypes.DATE)
  @Default(DataTypes.NOW)
  declare updatedAt?: Date;
}
