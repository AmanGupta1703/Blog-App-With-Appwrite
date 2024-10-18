import { Client, Databases, ID } from "appwrite";

import conf from "../config/conf";

class DatabasesService {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(conf.appwriteEndpoint).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async getArticles() {
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId);
    } catch (error) {
      console.log("Appwrite service :: getArticles() :: ", error);
    }
  }

  async getArticle(postId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
      );
    } catch (error) {
      console.log("Appwrite service :: getArticle() :: ", error);
    }
  }

  async deleteArticle(postId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
      );
    } catch (error) {
      console.log("Appwrite service :: deleteArticle() :: ", error);
    }
  }

  async createArticle({ title, content, summary, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { title, content, summary, userId },
      );
    } catch (error) {
      console.log("Appwrite service :: createArticle() :: ", error);
    }
  }

  async updateArticle({ title, content, summary, userId }, documentId) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        { title, content, summary, userId },
      );
    } catch (error) {
      console.log("Appwrite service :: updateArticle() :: ", error);
    }
  }
}

const databasesService = new DatabasesService();

export default databasesService;
