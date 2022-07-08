import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  CardActions,
} from "@mui/material";

import styles from "./cardConsulta.module.css";

const CardConsulta = ({ name, date, actions }) => {
  return (
    <>
      <Card className={styles.card}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              color="primary"
              className={styles.titleCard}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data da consulta: {date}
            </Typography>
          </CardContent>
        </CardActionArea>
        {actions ? <CardActions>{actions}</CardActions> : null}
      </Card>
    </>
  );
};

export default CardConsulta;
