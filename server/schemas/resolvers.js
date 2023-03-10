const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLError } = require("graphql");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            };
            throw new GraphQLError("You need to be logged in!", {
                extensions: {
                    code: "UNAUTHENTICATED",
                },
            });
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new GraphQLError("No user with this email found!", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                    },
                });
            };

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new GraphQLError("Incorrect password!", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                    },
                });
            };

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {
            console.log(context);
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { book } } },
                    {
                        new: true,
                        runValidators: true
                    }
                );
            };

            throw new GraphQLError("You need to be logged in!", {
                extensions: {
                    code: "UNAUTHENTICATED",
                },
            });
        },
        removeBook: async (parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: { savedBooks: book } },
                    { new: true }
                );
            };

            throw new GraphQLError("You need to be logged in!", {
                extensions: {
                    code: "UNAUTHENTICATED",
                },
            });
        }
    }
};


module.exports = resolvers;