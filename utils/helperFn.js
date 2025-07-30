"use client";
import {
  parseISO,
  parse,
  setHours,
  setMinutes,
  formatDistance,
} from "date-fns";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { isArray, isEmpty, padStart } from "lodash";
import _ from "lodash";
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject("Error converting file to Base64");
    };
    reader.readAsDataURL(file);
  });
};

export const query = "page=1&items_per_page=10";

export const timeAgoFn = (dateString) => {
  const date = new Date(dateString);
  const timeAgo = formatDistance(date, new Date(), { addSuffix: true });
  if (timeAgo === "less than a minute ago") {
    return "just now";
  }

  if (timeAgo.includes("minute")) {
    return timeAgo.replace("minute", "m").replace("about", "");
  } else if (timeAgo.includes("hours")) {
    return timeAgo.replace("hours", "h").replace("about", "");
  } else if (timeAgo.includes("day")) {
    return timeAgo.replace("day", "d").replace("about", "");
  }

  return timeAgo;
};

export const formatDateNew = (dateStr) => {
  const inputDate = new Date(dateStr);
  const formattedDate = format(inputDate, "MMM dd, yyyy");
  return formattedDate;
};
export const splitArrayByType = (inputArray, typeToCheck) => {
  const matching = [];
  const nonMatching = [];

  inputArray.forEach((item) => {
    if (typeof item === typeToCheck) {
      matching.push(item);
    } else {
      nonMatching.push(item);
    }
  });

  return { matching, nonMatching };
};

export const formatTime = (inputTimeString) => {
  const inputTime = new Date(inputTimeString);

  const hours = inputTime.getHours();
  const minutes = inputTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedTime =
    padStart(formattedHours, 2, "0") + ":" + padStart(minutes, 2, "0") + ampm;
  return formattedTime;
};

export const joinWithComma = (...strings) => {
  return strings.filter((str) => str !== undefined).join(", ");
};
export const joinWithSpace = (...strings) => {
  return strings.filter((str) => str !== undefined).join(" ");
};

export const objectToQueryString = (obj) => {
  return _.map(
    obj,
    (value, key) =>
      `${encodeURIComponent(key.toLowerCase())}=${encodeURIComponent(value)}`
  ).join("&");
};
export const getSortResult = (data) => {
  return {
    beds_asc: 1,
    beds_desc: -1,
    available_asc: 1,
    available_desc: -1,
    listed_asc: 1,
    listed_desc: -1,
  }[data];
};

export const transformAmenities = (data) => {
  if (_.isArray(data) && data.length === 0) return;
  const modified = data.map((item) => {
    return {
      id: item,
      text: item,
    };
  });

  return modified;
};
export const isBase64Image = (str) => {
  return /^data:image\/[^;]+;base64,/.test(str);
};
export const formatOption = (dataArr) => {
  if (Array.isArray(dataArr) && dataArr.length <= 0) return null;
  return dataArr.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};
export const formatTags = (dataArr) => {
  if (Array.isArray(dataArr) && dataArr.length <= 0) return null;
  return dataArr.map((item, index) => {
    return {
      id: index,
      text: item,
    };
  });
};
export const formatTimeString = (isoDate) => {
  const parsedDate = parseISO(isoDate);
  const formattedDate = format(parsedDate, `hh:mm a`);
  return formattedDate;
};
export const convertDates = (data) => {
  const convertedData = {};

  for (const day in data) {
    const { isOpen, from, to } = data[day];

    if (from && to) {
      convertedData[day] = {
        isOpen,
        from: parseISO(from),
        to: parseISO(to),
      };
    } else {
      convertedData[day] = {
        isOpen,
        from: null,
        to: null,
      };
    }
  }

  return convertedData;
};

export const transformTimeData = (data) => {
  if (isEmpty(data)) return;
  const { _id, ...transformedData } = { ...data };
  for (const day in transformedData) {
    if (
      day !== "_id" &&
      typeof transformedData[day].from === "string" &&
      typeof transformedData[day].to === "string"
    ) {
      const fromParts = transformedData[day].from.match(
        /(\d+):(\d+)([APap][Mm])/
      );
      const toParts = transformedData[day].to.match(/(\d+):(\d+)([APap][Mm])/);

      if (fromParts && toParts) {
        const fromHours = parseInt(fromParts[1]);
        const fromMinutes = parseInt(fromParts[2]);
        const fromAMPM = fromParts[3].toUpperCase();
        const toHours = parseInt(toParts[1]);
        const toMinutes = parseInt(toParts[2]);
        const toAMPM = toParts[3].toUpperCase();

        // Convert to 24-hour format
        transformedData[day].from =
          fromAMPM === "AM" ? fromHours : fromHours + 12;
        transformedData[day].to = toAMPM === "AM" ? toHours : toHours + 12;

        // Add minutes
        transformedData[day].from = setMinutes(
          setHours(new Date(), transformedData[day].from),
          fromMinutes
        );
        transformedData[day].to = setMinutes(
          setHours(new Date(), transformedData[day].to),
          toMinutes
        );
      }
    }
  }
  return transformedData;
};

export const buildQueryString = (
  pageCount,
  filterZipCode,
  filterName,
  filterLocation,
  filterMode,
  filterRating,
  eCommerceMode,
  orderBy,
  filterCity,
  filterCompany,
  bedsOrderBy,
  availabilityOrderBy
) => {
  let queryString = "";

  if (pageCount) {
    queryString += `&page=${pageCount}`;
  }
  if (orderBy) {
    queryString += `&order=${orderBy}`;
  }
  if (bedsOrderBy) {
    queryString += `&bed_order=${bedsOrderBy}`;
  }
  if (availabilityOrderBy) {
    queryString += `&available_date_order=${availabilityOrderBy}`;
  }

  if (filterZipCode) {
    queryString += `&filterZipCode=${filterZipCode}`;
  }

  if (filterName) {
    queryString += `&filterName=${filterName}`;
  }

  if (filterLocation) {
    queryString += `&filterLocation=${filterLocation}`;
  }

  if (filterMode) {
    queryString += `&filterMode=${filterMode}`;
  }

  if (filterRating) {
    queryString += `&filterRating=${filterRating}`;
  }
  if (eCommerceMode) {
    queryString += `&eCommerceMode=${eCommerceMode}`;
  }

  if (filterCity) {
    queryString += `&filterCity=${filterCity}`;
  }
  if (filterCompany) {
    queryString += `&company=${filterCompany}`;
  }

  return queryString;
};
export const buildQuery = (
  pageCount,
  search,
  filter_zipcode,
  filter_product,
  filterCity,
  businessName
) => {
  let queryString = "";

  if (pageCount) {
    queryString += `&page=${pageCount}`;
  }
  if (search) {
    queryString += `&searchName=${search}`;
  }
  if (filter_zipcode) {
    queryString += `&filter_zipcode=${filter_zipcode}`;
  }
  if (filter_product) {
    queryString += `&filter_product=${filter_product}`;
  }

  if (filterCity) {
    queryString += `&filterCity=${filterCity}`; // Add city to the query
  }
  if (businessName) {
    queryString += `&businessName=${businessName}`; // Add city to the query
  }

  return queryString;
};

export const isArrayEmptyOrWhitespace = (array) => {
  return array.length === 0 || (array.length === 1 && array[0].trim() === "");
};
export const getQueryParamsAsObject = (searchParams) => {
  const queryParamsObject = {};

  if (!searchParams) {
    return queryParamsObject;
  }

  for (const [key, value] of searchParams.entries()) {
    queryParamsObject[key] = value;
  }

  return queryParamsObject;
};

export const formatPhoneNumber = (str) => {
  const cleaned = str.replace(/\D/g, "");
  const isAlreadyFormatted = /^\(\d{3}\) \d{3}-\d{4}$/g.test(str);
  if (isAlreadyFormatted) {
    return str.trim();
  } else {
    const isValid = /^\d{10}$/g.test(cleaned);
    if (isValid) {
      const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6)}`;
      return formatted;
    }
  }
};
