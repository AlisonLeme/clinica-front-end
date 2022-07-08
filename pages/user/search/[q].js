import { Container, Typography, Box, Grid } from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";
import CardConsulta from "../../../src/components/cardConsulta";
import dbConnect from "../../../src/utils/dbConnect";
import ConsultasModel from "../../../src/models/consulta";
import SearchInput from "../../../src/components/SearchInput/SearchInput";

import styles from "./listQuery.module.css";

const List = ({ consultas, q }) => {
  const termo = q.toUpperCase();

  return (
    <TemplateDefault>
      <Container maxWidth={"lg"}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography component="h1" variant="h4" align="center">
              Procurar consulta
            </Typography>
            <SearchInput />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box className={styles.box}>
              <Typography component={"h6"} variant="h6">
                Consultas
              </Typography>
              <Typography component={"span"} variant="suntitle2">
                ENCONTRADOS {consultas.length} CONSULTAS PARA O PACIENTE{" "}
                <strong>{termo}</strong>
              </Typography>

              <Grid container spacing={4} className={styles.gridCards}>
                {consultas.map((consulta) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={consulta._id}>
                      <CardConsulta
                        name={consulta.paciente.name}
                        date={consulta.date}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export async function getServerSideProps({ query }) {
  const { q } = query;

  await dbConnect();

  const consultas = await ConsultasModel.find({
    $or: [
      {
        "paciente.name": {
          $regex: q,
          $options: "i",
        },
      },
    ],
  });

  return {
    props: {
      consultas: JSON.parse(JSON.stringify(consultas)),
      q,
    },
  };
}

export default List;
