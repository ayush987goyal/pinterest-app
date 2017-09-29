import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import * as schema from './schemaDetails';

@Injectable()
export class MongoService {

  constructor(private apollo: Apollo) { }

  findUserByEmail(userEmail: string) {
    return this.apollo.query({
      query: schema.findUser,
      variables: {
        userEmail: userEmail
      },
      fetchPolicy: 'network-only'
    });
  }

  addNewUser(name: string, email: string, pic: string) {
    return this.apollo.mutate({
      mutation: schema.addUser,
      variables: {
        name: name,
        email: email,
        pic: pic
      }
    });
  }

  getAllInterests() {
    return this.apollo.query({
      query: schema.allInterests,
      fetchPolicy: 'network-only'
    });
  }

  addNewInterest(title: string, img: string, userId: string) {
    return this.apollo.mutate({
      mutation: schema.addInterest,
      variables: {
        title: title,
        img: img,
        userId: userId
      }
    });
  }

  getAllUsers() {
    return this.apollo.query({
      query: schema.allUsers
    });
  }

  getInterestsOfaUser(id: string) {
    return this.apollo.query({
      query: schema.getInterestsOfUser,
      variables: {
        userId: id
      },
      fetchPolicy: 'network-only'
    })
  }

}
