import React from 'react'
import withAuthorization from '../../hoc/withAuthorization'
import { IonPage, IonHeader, IonTitle, IonThumbnail, IonLabel,  IonImg, IonToolbar, IonContent, IonButtons, IonBackButton, IonButton, IonList, IonItem } from "@ionic/react";
import ServiceItem from '../../components/service/ServiceItem'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/SpinnerComponent'

import { fetchReceivedOffers, changeOfferStatus } from '../../actions'

class ReceivedOffers extends React.Component {

  componentDidMount() {
    const { auth } = this.props
    this.props.fetchReceivedOffers(auth.user.uid)
  }

  acceptOffer = offerId => {
    this.props.changeOfferStatus(offerId, 'accepted')
  }

  declineOffer = offerId => {
    this.props.changeOfferStatus(offerId, 'declined')
  }

  statusClass = status => {
    if (status === 'pending') return 'is-warning'
    if (status === 'accepted') return 'is-success'
    if (status === 'declined') return 'is-danger'
  }

  render() {
    const { offers, isFetching } = this.props

    if (isFetching) { return <Spinner />}

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Received Offers</IonTitle>
          </IonToolbar>
        </IonHeader>
        { !isFetching && offers.length === 0 &&
          <span className="tag is-warning is-large">You don't have any received offers :(</span>
        }
      <IonContent>
      <IonList>
        {offers.map((offer) => 
          <IonItem
            key={offer.id} button key={offer.id}
              routerLink={`/my/offers/${offer.id}`}>
              <IonThumbnail slot="end">
                <IonImg src={offer.image} />
              </IonThumbnail>
              <IonLabel>
                <h2>{offer.title}</h2>
                <h4>{offer.status}</h4>
                <h5><span className="label">From User:</span> {offer.fromUser.fullName}</h5>
                <h5>status: {offer.status}</h5>
              </IonLabel>
            </IonItem>
          )}
        </IonList>

        </IonContent>
    </IonPage>
    )
  }
}

const mapStateToProps = ({offers}) => ({ offers: offers.received, isFetching: offers.isFetching })

const mapDispatchToProps = () => ({
  changeOfferStatus,
  fetchReceivedOffers
})

export default  
  withAuthorization(
      connect(mapStateToProps, mapDispatchToProps())(ReceivedOffers))