import { useSession } from "next-auth/react";

import { Typography } from "@mui/material";

import CardLogin from "../src/components/cardLogin";

import TemplateDefault from "../src/templates/Default";

import styles from "../styles/home.module.css";

const Home = () => {
  const { data: session } = useSession();
  return (
    <TemplateDefault>
      <div className={styles.container}>
        <div className={styles.content}>
          {!session ? (
            <CardLogin title="Acesso exclusivo para funcionários" />
          ) : (
            <Typography variant="h1" component="h1">
              Bem vindo {session.user.name}!
            </Typography>
          )}
        </div>
      </div>
    </TemplateDefault>
  );
};

export default Home;
