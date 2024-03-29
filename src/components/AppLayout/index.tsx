import { Route, Routes } from "react-router-dom"
import { Layout } from "antd";

import styles from "./AppLayout.module.css"
import Home from "../../pages/Home"
import CryptoInfo from "../../pages/CryptoInfo";

import Favorites from "../../pages/Favorites";
import Modal from "../Modal";
import Purchased from "../../pages/Purchased";
import Navigation from "../Navigation";
import ContentLayout from "../ContentLayout";

export default function AppLayout () {
  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <Navigation />
      </Layout.Header>
      <Layout.Content>
        <div className={styles.content}>
          <Routes>
            <Route 
              element={
                <ContentLayout title="Home">
                  <Home />
                </ContentLayout>
              }
              path="/"
            />
            <Route 
              element={<CryptoInfo />}
              path="/crypto/:id"
            />
            <Route 
              element={
                <ContentLayout title="Favorites">
                  <Favorites />
                </ContentLayout>
              }
              path="/favorites"
            />
            <Route 
              element={
                <ContentLayout title="Purchased">
                  <Purchased />
                </ContentLayout>
              }
              path="/purchased"
            />
          </Routes>
          <Modal />
        </div> 

      </Layout.Content>
    </Layout>
  )
}