import { ProductDataRepository } from "../../../usecases/repositories/ProductDataRepository";
import MainCategory from "../../../domains/models/MainCategory";
import Category from "../../../domains/models/Category";
import Brands from "../../../domains/models/Brands";
import Admin from "../../../domains/models/Admin";
import { Response } from "./Response";
import Wishlist from "../../../domains/models/Wishlist";
export class ProductDataRepositoryImpl implements ProductDataRepository {
  async addMainCategory(
    MainCategoryName: String,
    Createdby: any
  ): Promise<any> {
    if (!MainCategoryName) {
      return {
        message: "main category can not be null",
        statusCode: 201,
      };
    }
    try {
      const data = await MainCategory.create({
        mainCategory: MainCategoryName,
        createdBY: Createdby,
      });
      return {
        message: "Success",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "not found",
        statusCode: 404,
        data: error,
      };
    }
  }
  async getAllMainCategory(): Promise<any> {
    try {
      const data = await MainCategory.find();
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "not found",
        statusCode: 404,
        data: error,
      };
    }
  }
  async getMainCategoryById(args: String): Promise<any> {
    if (!args) {
      return {
        message: "main category id can not be null",
        statusCode: 201,
      };
    }
    try {
      const data = await MainCategory.findOne({ _id: args });
      console.log(data);
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "Not found",
        statusCode: 404,
        data: error,
      };
    }
  }
  async deleteMainCategoryById(args: String, createdBy: any): Promise<any> {
    if (!args) {
      return {
        message: "main category id can not be null",
        statusCode: 201,
      };
    }
    try {
      const deletedItem = await MainCategory.findOneAndDelete({
        _id: args,
        createdBY: createdBy._id,
      });
      return {
        message: "success true",
        statusCode: 201,
        data: deletedItem,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 501,
        data: error,
      };
    }
  }
  async updateMainCategoryById(
    updatedata: String,
    productid: any,
    createdBy: any
  ): Promise<any> {
    if (!productid) {
      return {
        message: "main category id can not be null",
        statusCode: 201,
      };
    }
    try {
      const forupdate = {
        mainCategory: updatedata,
      };
      const data = await MainCategory.findOneAndUpdate(
        { _id: productid, createdBY: createdBy._id },
        forupdate
      );
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 501,
        data: error,
      };
    }
  }
  async getMainCategoryByUserId(args: any): Promise<any> {
    try {
      const data = await MainCategory.find({ createdBY: args._id });
      if (data.length > 0) {
        return {
          message: "success true",
          statusCode: 201,
          data: data,
        };
      } else {
        return {
          message: "NO main categories found",
          statusCode: 201,
        };
      }
    } catch (error) {
      return {
        message: "success false",
        statusCode: 501,
        data: error,
      };
    }
  }
  async addProductCategory(
    MainCategoryName: String,
    Categoryname: String,
    Createdby: any
  ): Promise<any> {
    if (!MainCategoryName || !Categoryname) {
      return {
        message: "please fill all the details",
        statusCode: 501,
      };
    }
    try {
      let main = await MainCategory.findOne({
        mainCategory: MainCategoryName,
      });
      let data = await Category.create({
        Categoryname: Categoryname,
        mainCategory: main,
        createdBy: Createdby._id,
      });
      main?.category.push(data.id);
      const res = await main?.save();
      console.log("main data ::: res :: ", res);
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
      };
    }
  }
  async getAllProductCategories(createdBy: any): Promise<any> {
    try {
      const data = await Category.find().populate([
        "createdBy",
        "mainCategory",
      ]);
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
      };
    }
  }
  async AllProductCategoriesCreatedByUser(createdBy: any): Promise<any> {
    try {
      const data = await Category.find({ createdBy: createdBy._id });
      console.log(data);
      if (data.length > 0) {
        return {
          message: "success true",
          statusCode: 201,
          data: data,
        };
      } else {
        return {
          message: "no product categories found",
          statusCode: 201,
        };
      }
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
      };
    }
  }
  async getProductCategoryById(args: String): Promise<any> {
    try {
      const data = await Category.findOne({ _id: args }).populate([
        "mainCategory",
        "createdBy",
      ]);
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
      };
    }
  }
  async deleteProductCategoryById(args: String, createdBy: any): Promise<any> {
    if (!args) {
      return {
        message: "main category id can not be null",
        statusCode: 201,
      };
    }

    try {
      const deletedItem = await Category.findOneAndDelete({
        _id: args,
        createdBy: createdBy._id,
      });
      return {
        message: "success true",
        statusCode: 201,
        data: deletedItem,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
      };
    }
  }
  async updateProductCategoryById(
    productid: String,
    updatedata: String,
    createdBy: any
  ): Promise<any> {
    if (!productid) {
      return {
        message: "main category id can not be null",
        statusCode: 201,
      };
    }
    try {
      const forupdate = {
        Categoryname: updatedata,
      };
      console.log(forupdate);
      const data = await Category.findOneAndUpdate(
        { _id: productid, createdBy: createdBy._id },
        forupdate
      );
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 501,
        data: error,
      };
    }
  }
  async addProductBrand(
    mainCategory: string,
    category: string,
    brandname: string,
    createdBy: any
  ): Promise<any> {
    if (!mainCategory || !category || !brandname) {
      return {
        message: "please fill all the details",
        statusCode: 501,
      };
    }
    try {
      const main = await MainCategory.findOne({ mainCategory: mainCategory });
      const categorydetails = await Category.findOne({
        Categoryname: category,
      });
      const user = await Admin.findOne({ _id: createdBy._id });
      const brand = await Brands.create({
        brandname: brandname,
        createdBy: user,
        category: categorydetails,
        mainCategory: main,
      });
      console.log(brand);
      return {
        message: "success true",
        statusCode: 201,
        data: brand,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
        data: error,
      };
    }
  }
  async getAllProductBrands(createdBY: any): Promise<any> {
    try {
      const data = await Brands.find().populate([
        "createdBy",
        "mainCategory",
        "category",
      ]);
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
      };
    }
  }
  async getAllProductBrandCreatedByUser(user: any): Promise<any> {
    try {
      const data = await Brands.find({ createdBy: user._id }).populate([
        "createdBy",
        "mainCategory",
        "category",
      ]);
      console.log(data);
      if (data.length > 0) {
        return {
          message: "success true",
          statusCode: 201,
          data: data,
        };
      } else {
        return {
          message: "no product categories found",
          statusCode: 201,
        };
      }
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
        data: error,
      };
    }
  }
  async deleteProductBrandById(args: String, createdBy: any): Promise<any> {
    if (!args) {
      return {
        message: "main category id can not be null",
        statusCode: 201,
      };
    }
    try {
      const deletedItem = await Brands.findOneAndDelete({
        _id: args,
        createdBy: createdBy._id,
      });
      return {
        message: "success true",
        statusCode: 201,
        data: deletedItem,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
      };
    }
  }
  async getProductBrandById(args: String): Promise<any> {
    try {
      const data = await Brands.findOne({ _id: args }).populate([
        "mainCategory",
        "createdBy",
        "category",
      ]);
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 404,
      };
    }
  }
  async updateProductBrandById(
    productid: String,
    updatedata: String,
    createdBy: any
  ): Promise<any> {
    console.log(productid);
    if (!productid) {
      return {
        message: "main category id can not be null",
        statusCode: 201,
      };
    }
    try {
      const forupdate = {
        brandname: updatedata,
      };
      const data = await Brands.findOneAndUpdate(
        { _id: productid, createdBy: createdBy._id },
        forupdate
      );
      console.log(data);
      return {
        message: "success true",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return {
        message: "success false",
        statusCode: 501,
        data: error,
      };
    }
  }

  async getCategoryMenuList(): Promise<any> {
    try {
      const data = await MainCategory.find().populate(["category"]);
      return {
        message: "success",
        statusCode: 200,
        data: data,
      };
    } catch (error) {
      return {
        message: "not found",
        statusCode: 404,
        data: error,
      };
    }
  }

  //Wishlistitem
  async addToWishlist(args: any): Promise<Response> {
    const { userId, productId } = args;

    try {
      const wishlistSchema = new Wishlist({
        userId: userId,
        productId: productId,
      });
      let res = await wishlistSchema.save();
    } catch (error) {
      return {
        message: "Something went wrong",
        statusCode: 500,
      };
    }
    return {
      message: "Item added to wishlist",
      statusCode: 200,
    };
  }

  async getWishlistItemList(args: any): Promise<Response> {
    const { userId } = args;

    try {
      let wishlist = await Wishlist.find({
        userId: userId,
      });
      return {
        message: "Success",
        statusCode: 200,
        data: wishlist,
      };
    } catch (error) {
      return {
        message: "Something went wrong",
        statusCode: 500,
      };
    }
  }
}
