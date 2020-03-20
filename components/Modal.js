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
    text: {
        margin: 8,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 256,
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
      <Text>Atenção</Text>

      <Text>
          Baseado em suas respostas, é possível que esta situação se enquadre como caso suspeito ou provável de doença pelo coronavírus 2019 (codiv-19). No entanto, isto não se trata de um diagnóstico. A orientação é que você procure atendimento em uma unidade de  saúde mais próxima para avaliação médica
      </Text>
      <Text style={styles.text}>
          Orientações: 
          <Text style={styles.text}>
            Use máscara facial
          </Text >
          <Text style={styles.text}>
            Lave as mão frequentemente
          </Text>
          <Text>
            Use álcool gel 70
          </Text>
          <Text>
            Cubra a boca e nariz ao tossir
          </Text>
          <Text>
            Não Compartilhe objetos de uso pessoal
          </Text>
          <Text>
            Evite aglomerações
          </Text>
      </Text>
    </Layout>
  );

const ModalWapper = ({ visible }) => {

    // const [visible, setVisible] = React.useState(false);
    
    const toggleModal = () => {
        setVisible(!visible);
    };
    
    return (
        <Modal
            backdropStyle={styles.backdrop}
            onBackdropPress={toggleModal}
            visible={visible}>
            {renderModal()}
        </Modal>
    )
}

export default ModalWapper