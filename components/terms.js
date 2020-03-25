import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

export const ModalWithBackdropShowcase = ({ visible, setVisible }) => {

  const toggleModal = () => setVisible(!visible)

  const renderModalElement = () => (
    <Layout
      level='3'
      style={styles.modalContainer}
    >
      <Text style={styles.title}>POLÍTICA DE PRIVACIDADE</Text>
      <Text>
        O XôCovid é um aplicativo da RedFox Soluções Digitais Ltda., uma empresa de transformação digital especializada no segmento da Saúde, cuja missão é transformar negócios e pessoas por meio da tecnologia.  Disponível nas versões iOS e Android, o aplicativo tem o objetivo de rastrear e monitorar em tempo real pessoas positivadas com o novo coronavirus (Covid19). O XôCovid considera a sua privacidade uma prioridade e assume a proteção dos seus dados pessoais como uma das nossas principais preocupações. Na presente Política de Privacidade, descrevemos quem somos, para que finalidades tratamos os seus dados, como os tratamos, com quem os compartilhamos, durante quanto tempo os conservamos, bem como as formas de entrar em contato conosco para exercer os seus direitos.    
      </Text>
      <Text style={styles.title}>QUEM SOMOS?</Text>
      <Text>
        A humanidade está diante de uma guerra. Uma guerra sem precedentes no mundo moderno e que, além das trágicas mortes, irá mudar de maneira profunda a maneira como nós, humanos, nos organizamos e nos relacionamos. Acreditando no poder transformador da união entre as pessoas, e tendo aplicação da tecnologia para resultados como principal foco, lançamos o aplicativo XôCovid. Conscientes de que nossos verdadeiros heróis se encontram na linha da frente das Instituições de Saúde, temos por objetivo ajudá-los com a redução da velocidade de disseminação do Covid19 através da tecnologia. No aplicativo, pessoas diagnosticadas com o Covid19 podem baixar o app para que seja possível rastrear a sua localização, sexo e faixa etária. Assim, as demais pessoas terão um meio de saber onde estão os diagnosticados, podendo evitar estes ambientes temporariamente. Ao mesmo tempo, a nossa tecnologia gera estatísticas em tempo real de quem são e onde se encontram as pessoas que estão positivadas com o Covid19, podendo orientar ações diretas e políticas públicas em determinadas regiões.
      </Text>
      <Text style={styles.title}>PARA QUE FINALIDADES TRATAMOS OS SEUS DADOS PESSOAIS? </Text>
      <Text>
        O XôCovid trata os seus dados para disponibilizar um mapa com a localização aproximada de pessoas infectadas pelo vírus Covid19, bem como para segmentar os usuários em grupos de maior e menor risco. Nesse sentido, o tratamento dos seus dados pessoais (e-mail, sexo, idade e localização) será necessário para efeitos de registo, autenticação, classificação e organização dos usuários. Caso não concorde em disponibilizar os seus dados, você não poderá utilizar o aplicativo. Os seus dados pessoais serão conservados, no âmbito desta finalidade, enquanto o aplicativo XôCovid estiver disponível. O XôCovid poderá tratar os seus dados para lhe enviar comunicações por e-mail sobre sua conta e temas relacionados ao novo coronavirus (Covid19). Este tratamento de dados somente será realizado com o seu consentimento, obtido através da confirmação com estes termos, no momento da criação do seu cadastro nos aplicativos. Você poderá, a qualquer momento, opor-se a este tratamento de dados e solicitar a extinção dos mesmos através do endereço de e-mail contato.xocovid@gmail.com. O XôCovid tratará os seus dados de forma a poder analisar e resolver a situação relacionada à sua sugestão ou reclamação, armazenando os mesmos durante o tempo necessário à resolução da sua solicitação, ou até o prazo máximo de 60 dias desde a apresentação da sua sugestão ou reclamação.
      </Text>
      <Text style={styles.title}>OS MEUS DADOS PESSOAIS SERÃO PARTILHADOS COM TERCEIROS? </Text>
      <Text>
        Os seus dados pessoais poderão ser partilhados com terceiros. Com efeito, ao utilizar o aplicativo XôCovid, você nos concede o direito de partilhar os seus dados pessoais com órgãos públicos, instituições de saúde, voluntários, empresas parceiras ou subcontratadas, bem como prestadores de serviços individuais ou similares. Apenas serão partilhados os dados pessoais necessários para cada finalidade.
      </Text>
      <Text style={styles.title}>QUAIS SÃO OS MEUS DIREITOS?</Text>
      <Text>
        A qualquer momento, você pode nos solicitar: o acesso aos dados pessoais que mantemos sobre você; a retificação dos dados pessoais, caso estejam equivocados ou incompletos; a exclusão dos seus dados pessoais; e a oposição ou limitação do seu tratamento, em determinadas situações. As suas solicitações serão tratadas com o máximo de cuidado pelo nosso time de Suporte. De modo a assegurar a legitimidade da solicitação, os reservamos ao direito de solicitar alguma forma de comprovação de identidade. Por favor, tenha ciência de que, em certos casos (por exemplo, devido a exigências legais), a sua solicitação poderá não ser imediatamente satisfeita. De qualquer modo, você será informado em no máximo 30 dias corridos, a contar da data do recebimento de sua solicitação, das razões que nos levaram a não tomar as medidas imediatamente.
      </Text>
      <Text style={styles.title}>POSSO REVOGAR POSTERIORMENTE O MEU CONSENTIMENTO? </Text>
      <Text>
        Se o consentimento for legalmente necessário para o tratamento de dados pessoais, o titular dos dados tem o direito de retirar o consentimento dado em qualquer momento, embora esse direito não comprometa a licitude do tratamento efetuado com base no consentimento previamente dado nem o tratamento posterior dos mesmos dados. Caso pretenda retirar o seu consentimento, por favor contate-nos através do endereço de e-mail contato.xocovid@gmail.com.
      </Text>
      <Text style={styles.title}>TEM ALGUMA DÚVIDA? </Text>
      <Text>
        Caso ainda tenha alguma dúvida relativa ao tratamento dos seus dados pessoais, ou pretenda exercer algum dos direitos acima referidos, por favor contate-nos através do endereço de e-mail contato.xocovid@gmail.com.
      </Text>
      <Text style={styles.title}>ÚLTIMA ATUALIZAÇÃO:  </Text>
      <Text>
        24 Março 2020
      </Text>
    </Layout>
  )

  return (
    <Layout
      level='3'
      style={styles.modalContainer}
    >
      <Text style={styles.title}>POLÍTICA DE PRIVACIDADE</Text>
      <Text>
        O XôCovid é um aplicativo da RedFox Soluções Digitais Ltda., uma empresa de transformação digital especializada no segmento da Saúde, cuja missão é transformar negócios e pessoas por meio da tecnologia.  Disponível nas versões iOS e Android, o aplicativo tem o objetivo de rastrear e monitorar em tempo real pessoas positivadas com o novo coronavirus (Covid19). O XôCovid considera a sua privacidade uma prioridade e assume a proteção dos seus dados pessoais como uma das nossas principais preocupações. Na presente Política de Privacidade, descrevemos quem somos, para que finalidades tratamos os seus dados, como os tratamos, com quem os compartilhamos, durante quanto tempo os conservamos, bem como as formas de entrar em contato conosco para exercer os seus direitos.    
      </Text>
      <Text style={styles.title}>QUEM SOMOS?</Text>
      <Text>
        A humanidade está diante de uma guerra. Uma guerra sem precedentes no mundo moderno e que, além das trágicas mortes, irá mudar de maneira profunda a maneira como nós, humanos, nos organizamos e nos relacionamos. Acreditando no poder transformador da união entre as pessoas, e tendo aplicação da tecnologia para resultados como principal foco, lançamos o aplicativo XôCovid. Conscientes de que nossos verdadeiros heróis se encontram na linha da frente das Instituições de Saúde, temos por objetivo ajudá-los com a redução da velocidade de disseminação do Covid19 através da tecnologia. No aplicativo, pessoas diagnosticadas com o Covid19 podem baixar o app para que seja possível rastrear a sua localização, sexo e faixa etária. Assim, as demais pessoas terão um meio de saber onde estão os diagnosticados, podendo evitar estes ambientes temporariamente. Ao mesmo tempo, a nossa tecnologia gera estatísticas em tempo real de quem são e onde se encontram as pessoas que estão positivadas com o Covid19, podendo orientar ações diretas e políticas públicas em determinadas regiões.
      </Text>
      <Text style={styles.title}>PARA QUE FINALIDADES TRATAMOS OS SEUS DADOS PESSOAIS? </Text>
      <Text>
        O XôCovid trata os seus dados para disponibilizar um mapa com a localização aproximada de pessoas infectadas pelo vírus Covid19, bem como para segmentar os usuários em grupos de maior e menor risco. Nesse sentido, o tratamento dos seus dados pessoais (e-mail, sexo, idade e localização) será necessário para efeitos de registo, autenticação, classificação e organização dos usuários. Caso não concorde em disponibilizar os seus dados, você não poderá utilizar o aplicativo. Os seus dados pessoais serão conservados, no âmbito desta finalidade, enquanto o aplicativo XôCovid estiver disponível. O XôCovid poderá tratar os seus dados para lhe enviar comunicações por e-mail sobre sua conta e temas relacionados ao novo coronavirus (Covid19). Este tratamento de dados somente será realizado com o seu consentimento, obtido através da confirmação com estes termos, no momento da criação do seu cadastro nos aplicativos. Você poderá, a qualquer momento, opor-se a este tratamento de dados e solicitar a extinção dos mesmos através do endereço de e-mail contato.xocovid@gmail.com. O XôCovid tratará os seus dados de forma a poder analisar e resolver a situação relacionada à sua sugestão ou reclamação, armazenando os mesmos durante o tempo necessário à resolução da sua solicitação, ou até o prazo máximo de 60 dias desde a apresentação da sua sugestão ou reclamação.
      </Text>
      <Text style={styles.title}>OS MEUS DADOS PESSOAIS SERÃO PARTILHADOS COM TERCEIROS? </Text>
      <Text>
        Os seus dados pessoais poderão ser partilhados com terceiros. Com efeito, ao utilizar o aplicativo XôCovid, você nos concede o direito de partilhar os seus dados pessoais com órgãos públicos, instituições de saúde, voluntários, empresas parceiras ou subcontratadas, bem como prestadores de serviços individuais ou similares. Apenas serão partilhados os dados pessoais necessários para cada finalidade.
      </Text>
      <Text style={styles.title}>QUAIS SÃO OS MEUS DIREITOS?</Text>
      <Text>
        A qualquer momento, você pode nos solicitar: o acesso aos dados pessoais que mantemos sobre você; a retificação dos dados pessoais, caso estejam equivocados ou incompletos; a exclusão dos seus dados pessoais; e a oposição ou limitação do seu tratamento, em determinadas situações. As suas solicitações serão tratadas com o máximo de cuidado pelo nosso time de Suporte. De modo a assegurar a legitimidade da solicitação, os reservamos ao direito de solicitar alguma forma de comprovação de identidade. Por favor, tenha ciência de que, em certos casos (por exemplo, devido a exigências legais), a sua solicitação poderá não ser imediatamente satisfeita. De qualquer modo, você será informado em no máximo 30 dias corridos, a contar da data do recebimento de sua solicitação, das razões que nos levaram a não tomar as medidas imediatamente.
      </Text>
      <Text style={styles.title}>POSSO REVOGAR POSTERIORMENTE O MEU CONSENTIMENTO? </Text>
      <Text>
        Se o consentimento for legalmente necessário para o tratamento de dados pessoais, o titular dos dados tem o direito de retirar o consentimento dado em qualquer momento, embora esse direito não comprometa a licitude do tratamento efetuado com base no consentimento previamente dado nem o tratamento posterior dos mesmos dados. Caso pretenda retirar o seu consentimento, por favor contate-nos através do endereço de e-mail contato.xocovid@gmail.com.
      </Text>
      <Text style={styles.title}>TEM ALGUMA DÚVIDA? </Text>
      <Text>
        Caso ainda tenha alguma dúvida relativa ao tratamento dos seus dados pessoais, ou pretenda exercer algum dos direitos acima referidos, por favor contate-nos através do endereço de e-mail contato.xocovid@gmail.com.
      </Text>
      <Text style={styles.title}>ÚLTIMA ATUALIZAÇÃO:  </Text>
      <Text>
        24 Março 2020
      </Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16
  },
  title: {
    fontWeight: 'bold'
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
