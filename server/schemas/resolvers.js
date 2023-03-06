import { User } from "../models";
import { signToken } from "../utils/auth";
import { GraphQLError } from "graphql";
//TODO:

export default resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: userId });
            };
            throw new GraphQLError("You need to be logged in!", {
                extensions: {
                    code: "UNAUTHENTICATED",
                },
            });
        },
    },

    Mutation: {
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password});
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

            const correctPw = await User.isCorrectPassword(password);

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
        // TODO: figure out the authors array. something to do with input type
        addBook: async (parent, { userId, authors: [], description, bookId, image, link, title }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: book }},
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

// module.exports = resolvers;