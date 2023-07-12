import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Bet extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  betAmount: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  chance: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  payout: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  win: boolean;
}
