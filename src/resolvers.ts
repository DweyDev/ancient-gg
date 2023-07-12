const { User } = require('./models/user');
const { Bet } = require('./models/bet');
const { Sequelize } = require('sequelize');

export const resolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: number }) => await User.findByPk(id),
    getUserList: () => User.findAll(),
    getBet: (_, { id }) => Bet.findByPk(id),
    getBetList: () => Bet.findAll(),
    getBestBetPerUser: async (_, { limit }: {limit: number}, {sequelize}) => {
      const bestBets = await sequelize.query(`
        SELECT *
        FROM "Bets"
        WHERE "payout" IN (
          SELECT MAX("payout")
          FROM "Bets"
          GROUP BY "userId"
        )
        LIMIT :limit
      `, 
      {
        replacements: { limit: limit || 10 },
        type: sequelize.QueryTypes.SELECT,
        mapToModel: true,
        model: Bet,
      });

      return bestBets;
    },
  },
  Mutation: {
    createBet: async (_, { userId, betAmount, chance }) => {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User not found');
      }

      if (user.balance < betAmount) {
        throw new Error('Insufficient balance');
      }

      const win = Math.random() <= chance / 100;
      const payout = win ? betAmount / (chance / 100) : 0;

      user.balance += payout - betAmount;
      await user.save();

      return Bet.create({
        userId,
        betAmount,
        chance,
        payout,
        win,
      });
    },
    createUser: async (_: any, { name, balance }: { name: string, balance: number }) => {
        return await User.create({ name, balance });
    }
  },
};

