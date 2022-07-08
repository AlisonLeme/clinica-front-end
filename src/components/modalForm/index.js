import { Grid, Typography, Box, Button } from "@mui/material/";

import Modal from "@mui/material/Modal";

import FormCadastro from "../modalCadastro";
import FormLogin from "../modalLogin";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import styles from "./ModalForm.module.css";

const ModalLogin = ({ open, handleModalClose, name, isSuccess }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box}>
          <Grid container spacing={2} className={styles.grid}>
            <Grid item xs={12} md={6} className={styles.gridInfo}>
              <Typography
                variant="h3"
                component="h3"
                align="center"
                color="secondary.light"
                sx={{ fontWeight: "bold" }}
              >
                Acesse para cadastrar pacientes e muito mais
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} className={styles.gridForm}>
              {isSuccess ? (
                <FormLogin name={name} />
              ) : (
                <FormCadastro name={name} />
              )}
              <Button className={styles.btnClose} onClick={handleModalClose}>
                <CancelPresentationIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLogin;
