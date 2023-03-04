import { Box, Typography } from "@mui/material";
import TwoColumns from "components/Card/TwoColumns";
import Wrapper from "components/Card/Wrapper";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { dependsOn, serializeValidData } from "utils/Helpers";
import langString from "utils/langString";

export default function ViewService() {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const { itemID } = useParams();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const postData = serializeValidData("Services", { id: itemID });
        const response = await axiosServices.post(
          `products/services/view/`,
          postData
        );
        if (response.status === 200) {
          const respData = await new Deserializer({
            keyForAttribute: "camelCase",
          }).deserialize(response.data);
          setDetails(respData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, [itemID]);

  return (
    <Wrapper
      title={`${langString("service")} ${langString("details")}`}
      backLink="/services"
    >
      {loading && <Loader />}
      {details ? (
        <>
          <Box sx={{ width: "80%" }}>
            <TwoColumns
              rows={[
                {
                  label: "Service Name",
                  value: details.name,
                },
                {
                  label: "Provider",
                  value: details.provider,
                },
                {
                  label: "Unit",
                  value: `${details.unitInfo?.name}`,
                },
                {
                  label: "Deponds on",
                  value: dependsOn(details.dependsOn),
                },
                {
                  label: "BSP (Sales Agent)",
                  value: details.rateBhaloSale
                    ? details.rateBhaloSale
                    : details.valueBhaloSale,
                },
                {
                  label: "BSP (Customer)",
                  value: details.rateBhaloSale
                    ? details.rateBhaloSale
                    : details.valueBhaloSale,
                },
                {
                  label: "Type",
                  value: details.valueBhaloSale ? "BDT" : "Percentage",
                },
                {
                  label: "Details",
                  value: details.description,
                },
                {
                  label: "Image",
                  value: (
                    <img
                      src={`${process.env.REACT_APP_IMAGE_BASE_URL}${details.imageUrl}`}
                      alt="serviceImage"
                      width="200"
                    />
                  ),
                },
              ]}
              border="1px solid #EEE"
              rightColor="#1C8D73"
            />
          </Box>
        </>
      ) : (
        <Typography variant="h4" margin={1}>
          {langString("datanotavailable")}
        </Typography>
      )}
    </Wrapper>
  );
}
