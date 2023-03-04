import defaultImage from "assets/images/placeholder/default.png";
import { Serializer } from "jsonapi-serializer";
import { BASEURL } from "./Constants";

// eslint-disable-next-line consistent-return
export async function fetchAuthorizedData(url: string, postData?: any) {
  try {
    const token = localStorage.getItem("serviceToken");
    return await fetch(BASEURL + url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(postData),
    }).then((data) => data.json());
  } catch (error) {
    console.log(error);
  }
}

export const fullFilePath = (picPath: string) => {
  if (!picPath) {
    return defaultImage;
  }
  if (picPath.includes("http")) {
    return picPath;
  }
  return `${BASEURL}${picPath
    ?.split("/")
    .filter((v) => v !== "")
    .join("/")}`;
};

export const serializeValidData = (
  model: string,
  data: any,
  page?: number,
  limit?: number
) => {
  const validData: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      validData[key] = value;
    }
  }
  if (limit) {
    validData.links = {
      page,
      limit,
    };
  }
  const attributes = Object.keys(validData);
  return new Serializer(model, {
    keyForAttribute: "camelCase",
    attributes,
  }).serialize(validData);
};

export const checkNullInfo = (info: string | null | undefined) => {
  if (info) {
    return info;
  }
  return "---";
};

export const discountPercentage = (price: number, discountedPrice: number) => {
  let discount = 0.0;
  if (price >= discountedPrice) {
    discount = ((price - discountedPrice) * 100) / price;
  }
  return discount.toFixed(2);
};

export const userRoleName = (roles: number[] | null | undefined) => {
  let roleNames = "";
  if (roles && roles.length) {
    roles.forEach((item: number) => {
      switch (item) {
        case 1:
          roleNames = roleNames + " SUPER ADMIN |";
          break;
        case 2:
          roleNames = roleNames + " HUB REPRESENTATIVE |";
          break;
        case 3:
          roleNames = roleNames + " SUPERVISOR |";
          break;
        case 4:
          roleNames = roleNames + " SALES AGENT |";
          break;
        case 5:
          roleNames = roleNames + " LOCAL SERVICE PROVIDER |";
          break;
        default:
          roleNames = roleNames + " SERVICE PROVIDER |";
          break;
      }
    });
  } else {
    roleNames = "Admin";
  }

  return roleNames;
};

export const validateFormFields = (fields: string[], values: any[]) => {
  const errors: any = { valid: true };
  if (fields.length) {
    fields.forEach((item: string, index: number) => {
      if (values[index]) {
        errors[item] = {
          required: false,
          message: "Good",
        };
      } else {
        errors.valid = false;
        const camelCase = item.replace(/([A-Z])/g, " $1");
        const sentence = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
        errors[item] = {
          required: true,
          message: `${sentence} is required`,
        };
      }
    });
  }
  return errors;
};

export function numberWithCommas(x: any) {
  if (typeof x !== "undefined" && x !== null) {
    if (x < 0) {
      return `(${Math.abs(x)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")})`;
    }
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return x;
  }
}

export function isNumeric(n: any) {
  return (!isNaN(parseFloat(n)) && isFinite(n)) || n === "";
}

export const dependsOn = (value: any) => {
  if (Number(value)) {
    switch (value) {
      case 1:
        return "Farm";
      case 2:
        return "Customer";
      case 3:
        return "Receivable";
      case 4:
        return "Collection";
      default:
        return "";
    }
  }
};

export const checkBase64Image = (value: any) => {
  if (value) {
    if (value.includes("data:image")) {
      return value;
    } else {
      return `${process.env.REACT_APP_IMAGE_BASE_URL}${value}`;
    }
  }
};

export const parsePatientCount = (data:any) =>{
  let count: any = [];
  let percentage:any = [];
  let cumulativeCount:any = [];
  data.map((value:any) => {
    count.push(Math.round(value.count));
    percentage.push(value.CCpercentage*100);
    cumulativeCount.push(value.cumulativeCount);
  });

  return {cout: count, percentage: percentage, cumulativeCount:cumulativeCount};
}



export const genderPatientCount = (data:any) =>{
  let male:any = [];
  let female:any = [];
  let total:any = [];
  data.map((value:any) => {
    male.push(Math.round(value.male));
    female.push(value.female);
    total.push(value.total);
  });

  return {male: male, female: female, total:total};
}

export const crashTimeCount = (data:any) =>{
  let count:any = [];
  let cumulativeCount:any = [];
  let cumulativePercent:any = [];
  data.map((value:any) => {
    count.push(Math.round(value.count));
    cumulativeCount.push(value.cumulativeCount);
    cumulativePercent.push(value.cumulativePercent);
  });

  return {cumulativePercent: cumulativePercent, count: count, cumulativeCount:cumulativeCount};
}



export const injuriesCount = (data:any) =>{

  let light:any = [];
  let severe:any = [];
  let moderate:any = [];
  for(let i in data){
    light.push(data[i].light)
    severe.push(data[i].severe)
    moderate.push(data[i].moderate)
  }

  return {light: light, severe: severe, moderate:moderate};
}