import React, { Component } from "react";
import { FeesEstimateCard } from "../../ui-molecules-local";
import { connect } from "react-redux";
import get from "lodash/get";

class RefundFeeAmountContainer extends Component {

    render() {
        const { refundAmount } = this.props;
        return (
            <div style={{marginLeft: "23px"}}>
                Refund Amount - <span style={{fontWeight:"bold"}}>Rs. {refundAmount}</span>
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    const { screenConfiguration } = state;



    const bookingDate = get(
        screenConfiguration,
        "preparedFinalObject.Booking.bkFromDate",
        []
    )
    var billAccountDetails = get(
        screenConfiguration,
        "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails[0].billAccountDetails",
        []
    );
    let refundAmount = 0;
    for(let i = 0; i<billAccountDetails.length; i++){
        if (billAccountDetails[i].taxHeadCode == "SECURITY_MANUAL_OPEN_SPACE_BOOKING_BRANCH" ||billAccountDetails[i].taxHeadCode =="SECURITY_CHRGS_COMMUNITY_CENTRES_JHANJ_GHAR_BOOKING_BRANCH" ||billAccountDetails[i].taxHeadCode =="SECURITY_COMMERCIAL_GROUND_BOOKING_BRANCH" ) {
            refundAmount += billAccountDetails[i].amount;
        }

    }




    return { refundAmount };
};

export default connect(mapStateToProps, null)(RefundFeeAmountContainer);
