import {
    Layout,
    Modal,
    Text
  } from '@ui-kitten/components';

import React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        minHeight: 256,
        padding: 16,
    },
    textBold: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    containerGuidelines: {
        marginBottom: 5,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        padding: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
});

const renderModal = () => (
    <Layout
      level='1'
      style={styles.modalContainer}>
      <Text style={styles.textBold}>Atenção</Text>
      <Layout style={styles.containerGuidelines}>
        {/* <Text>
            Baseado em suas respostas, é possível que esta situação se enquadre como caso suspeito ou provável de doença pelo coronavírus 2019 (codiv-19).
        </Text> */}
      </Layout >
      <Layout style={styles.containerGuidelines}>
        <Text style={styles.textBold}>
          Isto não se trata de um diagnóstico.
        </Text>
        <Text>
             A orientação é que em casos extremos você procure atendimento em uma unidade de  saúde mais próxima para avaliação médica
        </Text>
      </Layout >
          <Layout>
            <Text style={styles.textBold}>
            Orientações: 
            </Text >
          </Layout>
          <Layout style={styles.containerGuidelines}>
            
            <Text >
              Use máscara facial
            </Text >
          </Layout>
          <Layout style={styles.containerGuidelines}>
            <Text >
              Lave as mão frequentemente
            </Text>
          </Layout>
          <Layout style={styles.containerGuidelines}>
            <Text>
              Use álcool gel 70
            </Text>
          </Layout>
          <Layout style={styles.containerGuidelines}>
            <Text>
              Cubra a boca e nariz ao tossir
            </Text>
          </Layout>
          <Layout style={styles.containerGuidelines}>
            <Text>
              Não Compartilhe objetos de uso pessoal
            </Text>
          </Layout>
          <Layout style={styles.containerGuidelines}>
            <Text>
              Evite aglomerações
            </Text>
          </Layout>
    </Layout>
  );

const ModalGuideLine = ({ visible, nav }) => {
    
    const toggleModal = () => nav()
    
    return (
        <Modal
            backdropStyle={styles.backdrop}
            onBackdropPress={toggleModal}
            visible={visible}>
            {renderModal()}
        </Modal>
    )
}

export default ModalGuideLine