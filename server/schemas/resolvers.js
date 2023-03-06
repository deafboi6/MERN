import { User } from "../models";
import { signToken } from "../utils/auth";
import { GraphQLError } from "graphql";

const resolvers = {
    Query: {
        me: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
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
        addBook: async (parent, { authors: [], description, bookId, image, link, title })
    }
}