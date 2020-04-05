'use strict';
 
const animal = require('../models/animal');
const species = require('../models/species');
const category = require('../models/category');

 const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull} = require(
     'graphql');
 
 /*const animalData = [
   {
     id: '1',
     animalName: 'Frank',
     species: '1',
   },
 ];
 
 const speciesData = [
   {
     id: '1',
     speciesName: 'Cat',
     category: '1',
   },
 ];
 
 const categoryData = [
   {
     id: '1',
     categoryName: 'Mammal',
   },
 ];*/
 
 const categoryType = new GraphQLObjectType({
    name: 'category',
    description: 'Animal category',
    fields: () => ({
      id: {type: GraphQLID},
      categoryName: {type: GraphQLString},
    }),
  });

 const speciesType = new GraphQLObjectType({
    name: 'species',
    description: 'Animal species',
    fields: () => ({
      id: {type: GraphQLID},
      speciesName: {type: GraphQLString},
      category: {
        type: categoryType,
        resolve: async(parent, args) => {
            //return categoryData.find(cat => cat.id == parent.category);
            try {
                return await category.findById(parent.category);
            }
            catch (e) {
                return new Error(e.message);
            }
        }
      },
    }),
  });

const animalType = new GraphQLObjectType({
    name: 'animal',
    description: 'Animal name and species',
    fields: () => ({
        id: {type: GraphQLID},
        animalName: {type: GraphQLString},
        species: {
            type: speciesType,
            resolve: async(parent, args) => {
                //return speciesData.find(sp => sp.id == parent.species);
                try {
                    return await species.findById(parent.species);
                }
                catch (e) {
                    return new Error(e.message);
                }
            }
        },
    }),
});
 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        animals: {
            type: new GraphQLList(animalType),
            description: 'Get all animals',
            resolve: async (parent, args) => {
                try {
                    return await animal.find();
                }
                catch (e) {
                    return new Error(e.message);
                }
            },
        },
        animal: {
            type: animalType,
            description: 'Get animal by id',
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                //return animalData.find( ani => ani.id == args.id)
                try {
                    return await animal.findById(args.id);
                }
                catch (e) {
                    return new Error(e.message);
                }
            }
        }
    },
});

const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations...',
    fields: {
        addCategory: {
            type: categoryType,
            description: 'Add animal category like Fish, Mammal, etc.',
            args: {
                categoryName: {type: new GraphQLNonNull(GraphQLString)}, // add necessary imports
            },
            resolve: async (parent, args) => {
                try {
                    const newCategory = new category({
                        categoryName: args.categoryName,
                    });
                    return await newCategory.save();
                }
                catch (e) {
                    return new Error(e.message);
                }
            },
        },
        addSpecies: {
            type: speciesType,
            description: 'Add species like Cat, Dog, etc.',
            args: {
                speciesName: {type: new GraphQLNonNull(GraphQLString)}, // add necessary imports
                category: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                try {
                    const newSpecies = new species({
                        speciesName: args.speciesName,
                        category: args.category,
                    });
                    return await newSpecies.save();
                }
                catch (e) {
                    return new Error(e.message);
                }
            },
        },
        addAnimal: {
            type: animalType,
            description: 'Add animal with a name and species',
            args: {
                animalName: {type: new GraphQLNonNull(GraphQLString)}, // add necessary imports
                species: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                try {
                    const newAnimal = new animal({
                        animalName: args.animalName,
                        species: args.species,
                    });
                    return await newAnimal.save();
                }
                catch (e) {
                    return new Error(e.message);
                }
            },
        },
        modifyAnimal: {
            type: animalType,
            description: 'Modify animal name and species',
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                animalName: {type: new GraphQLNonNull(GraphQLString)}, // add necessary imports
                species: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                try {
                    /*const modifiedAnimal = animal.findById(args.id);
                    modifiedAnimal.animalName = args.animalName;
                    modifiedAnimal.species = args.species;
                    return await animal.findByIdAndUpdate(args.id, modifiedAnimal, {new:true});*/
                    return await animal.findByIdAndUpdate(args.id, args, {new:true});
                }
                catch (e) {
                    return new Error(e.message);
                }
            }
        },        
    },
});
  
 
 module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation,
 });
