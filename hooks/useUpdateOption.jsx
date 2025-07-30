import { useState, useEffect } from "react";

function useUpdateOptions(dataVal, optionType = "") {
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    if (dataVal) {
      if (optionType === "business_offer") {
        const businessArr = dataVal.filter(
          (item) => item.approvalStatus === "Verified"
        );
        const modifiedData = businessArr.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setTransformedData(modifiedData);
      } else {
        const modifiedData = dataVal.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setTransformedData(modifiedData);
      }
    }
  }, [dataVal]);

  return transformedData;
}

function usePostCategoryOptions(dataVal) {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (dataVal) {
      const modifiedData = dataVal.map((item) => ({
        value: item.id,
        label: item.name,
        slug: item.slug,
      }));
      setCategoryData(modifiedData);
    }
  }, [dataVal]);

  return categoryData;
}

export { useUpdateOptions, usePostCategoryOptions };
