import React from 'react'
import withAuthorization from '../../hoc/withAuthorization'
import { IonPage, IonHeader, IonTitle, IonLoading, IonLabel,IonCard,IonCardHeader,IonCardSubtitle,IonCardTitle, IonCardContent, IonImg, IonToolbar, IonContent, IonButtons, IonBackButton, IonButton, IonList, IonItem } from "@ionic/react";
import ServiceItem from '../../components/service/ServiceItem'
import { connect } from 'react-redux'

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

    if (isFetching) { return <IonLoading isOpen={isFetching} />}

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
              routerLink={`/my/offers/${offer.id}`}
              style={{height: "900px"}}>
                <IonCard>
                  <img src={offer.service.image} />
                  <IonCardHeader>
                    <IonCardSubtitle>{offer.title}</IonCardSubtitle>
                    <IonCardSubtitle>{offer.status}</IonCardSubtitle>
                  </IonCardHeader>
                <IonCardContent>
                  <h5><span className="label">From User:</span> {offer.fromUser.fullName}</h5>
                  <div>
                    <span className="label">Note:</span> {offer.note}
                  </div>
                { offer.status === 'pending' &&
                  <div>
                    <hr />
                    <button 
                      onClick={() => this.acceptOffer(offer.id)} 
                      className="button is-success s-m-r">Accept</button>
                    <button 
                      onClick={() => this.declineOffer(offer.id)} 
                      className="button is-danger">Decline</button>
                  </div>
                }
                </IonCardContent>
              </IonCard>
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