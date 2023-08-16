const { Mongoose } = require("mongoose");
const Category = require("../models/Category");
const { toast } = require("react-hot-toast");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
	try {
		const { categoryName, categoryDescription } = req.body;
		if (!categoryName || !categoryDescription) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: categoryName,
			description: categoryDescription,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

// show single category
exports.fetchCategoryById = async (req, res) => {
  const {categoryId} = req.body;
  // console.log(req);
  // console.log("category id inside controller "+ categoryId);
	try {
    const singleCategory = await Category.findById(categoryId);
    if (!singleCategory) {
      return res.status(404).json({ error: "single category not found" })
    }
    console.log("one category fetched "+singleCategory);
		return res.status(200).json({
			success: true,
			data: singleCategory,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.showAllCategories = async (req, res) => {
	try {
    console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategories = await Category.find({});
    // console.log("allcategories are "+allCategories);
		res.status(200).json({
			success: true,
			data: allCategories,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// delete category
exports.deleteCategory = async (req, res)=>{
  try {
    const { categoryId } = req.body
    console.log("category id "+categoryId);
    // Find the category by id
    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }
    // console.log("category data "+category);
    if(category.courses.length>0){
      return res.status(400).json({
        success: false,
        message: "It has course included It could not be deleted",
      });
    }
      await Category.findByIdAndDelete(categoryId);
      res.status(200).json({
          success: true,
          data: category,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}


// update category
exports.updateCategory = async (req, res) => {
  // console.log(req.body);
	try {
		const { categoryId, categoryName, categoryDescription } = req.body;
		// Find the category by id
    // console.log("category Id "+categoryId);
		const categoryDetails = await Category.findById(categoryId);
    console.log("categoryDetails "+categoryDetails);
		// Update the category fields
		categoryDetails.name = categoryName;
		categoryDetails.description = categoryDescription;

		// Save the updated profile
		await categoryDetails.save();
    // Category.updateOne({ categoryId, categoryName, categoryDescription }, categoryDetails);
		return res.json({
			success: true,
			message: "Category updated successfully",
			categoryDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      // console.log(req);
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }