import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import { Button, Grid, Typography, Box, Container } from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";

import CardConsulta from "../../../src/components/cardConsulta/index.js";
import dbConnect from "../../../src/utils/dbConnect";
import ConsultaModel from "../../../src/models/consulta";
import ModalConfirm from "../../../src/components/modalConfirm";
import SearchInput from "../../../src/components/SearchInput/SearchInput";
import useSnackBar from "../../../src/contexts/SnackBar";

import styles from "./dashboard.module.css";

const Dashboard = ({ consultas }) => {
  const router = useRouter();

  const [openModalRemove, setOpenModalRemove] = useState({
    open: false,
    title: "Deseja realmente remover essa consulta ?",
    content: "Ao confirmar a operação não será possivel voltar atrás",
  });
  const [openModalEdit, setOpenModalEdit] = useState({
    open: false,
    title: "Deseja realmente editar essa consulta ?",
    content: "Ao confirmar você será redirecionado para página de editar",
  });

  const [consultaId, setConsultaId] = useState();
  const [removeConsulta, setRemoveConsulta] = useState([]);
  const { setSnackBar } = useSnackBar();

  const handleClickRemove = (consultaId) => {
    setConsultaId(consultaId);
    setOpenModalRemove({ ...openModalRemove, open: true });
  };

  const handleClickEdit = (consultaId) => {
    setConsultaId(consultaId);
    setOpenModalEdit({ ...openModalEdit, open: true });
  };

  const handleClose = () => {
    setOpenModalRemove({ ...openModalRemove, open: false });
    setOpenModalEdit({ ...openModalEdit, open: false });
  };

  const handleConfirmRemove = () => {
    axios
      .delete("/api/consulta/delete", {
        data: {
          id: consultaId,
        },
      })
      .then(handleSuccess)
      .catch(handleError);
  };

  const handleConfirmEdit = () => {
    router.push(`/user/edit/${consultaId}`);
  };

  const handleSuccess = () => {
    setSnackBar({
      open: true,
      severity: "success",
      text: "Consulta removida com sucesso!",
    });
    router.push("/user/dashboard");
    handleClose();
    setRemoveConsulta([...removeConsulta, consultaId]);
  };

  const handleError = () => {
    setSnackBar({
      open: true,
      severity: "error",
      text: "Erro! Tente novamente",
    });
    handleClose();
  };
  return (
    <TemplateDefault>
      <Box className={styles.boxFilmes}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          className={styles.titleFilmes}
          color="primary"
        >
          Lista de consultas
        </Typography>
        <Link href="/user/registerPatient" passHref>
          <Button variant="contained" color="primary" className={styles.boxBtn}>
            Cadastrar Pacientes
          </Button>
        </Link>
        <Link href="/user/registerQuery" passHref>
          <Button
            variant="contained"
            color="primary"
            className={styles.boxBtn2}
          >
            Cadastrar Consultas
          </Button>
        </Link>
      </Box>

      <Container maxWidth="md" className={styles.searchContainer}>
        <Typography component="h1" variant="h4" align="center">
          Procurar consulta
        </Typography>
        <SearchInput />
      </Container>

      <Grid container spacing={3} className={styles.gridCard}>
        {consultas.map((consulta) => {
          return (
            <Grid key={consulta._id} item xs={12} md={6} lg={4} xl={3}>
              <CardConsulta
                name={consulta.paciente.name}
                date={consulta.date}
                actions={
                  <>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClickRemove(consulta._id)}
                    >
                      Remover
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClickEdit(consulta._id)}
                    >
                      Editar
                    </Button>
                  </>
                }
              />
            </Grid>
          );
        })}
      </Grid>
      <ModalConfirm
        title={openModalRemove.title}
        content={openModalRemove.content}
        handleConfirm={handleConfirmRemove}
        open={openModalRemove.open}
        handleClose={handleClose}
      />
      <ModalConfirm
        title={openModalEdit.title}
        content={openModalEdit.content}
        handleConfirm={handleConfirmEdit}
        open={openModalEdit.open}
        handleClose={handleClose}
      />
    </TemplateDefault>
  );
};

Dashboard.requireAuth = true;

export async function getServerSideProps({ req }) {
  await dbConnect();

  const consultas = await ConsultaModel.aggregate([
    {
      $sample: { size: 20 },
    },
  ]);

  return {
    props: {
      consultas: JSON.parse(JSON.stringify(consultas)),
    },
  };
}

export default Dashboard;
