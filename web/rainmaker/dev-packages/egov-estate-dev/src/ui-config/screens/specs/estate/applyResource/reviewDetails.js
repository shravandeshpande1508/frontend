import {
  getCommonCard,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getReviewPropertyInfo,
  getReviewAuction,
  getReviewAdditional,
  getReviewCompanyDetails,
  getReviewFirmDetails,
  getReviewProprietorshipDetails,
  getReviewGroundRent,
  getReviewLicenseFee,
  getReviewAdvanceRent,
  getReviewSecurity,
  getReviewConsolidatedPaymentDetails
} from "./reviewProperty";
import {getReviewRentSummary} from '../preview-resource/preview-properties'
const reviewRentSummary = getReviewRentSummary(true);

const header = getCommonTitle({
  labelName: "Please review your Application and Submit",
  labelKey: "ES_SUMMARY_HEADER"
})

if (typeof getReviewPropertyInfo != "undefined" && typeof getReviewAuction != "undefined" && typeof getReviewAdditional != "undefined") {
  var reviewPropertyInfo = getReviewPropertyInfo();
  var reviewAuction = getReviewAuction(true, "apply");
  var reviewAdditional = getReviewAdditional();
  var companyDetails = getReviewCompanyDetails();
  var firmDetails = getReviewFirmDetails();
  var proprietorDetails = getReviewProprietorshipDetails();
  var reviewGroundRent = getReviewGroundRent();
  var reviewLicenseFee = getReviewLicenseFee();
  var reviewAdvanceRent = getReviewAdvanceRent();
  var reviewSecurity = getReviewSecurity();
  var consolidatedPayment = getReviewConsolidatedPaymentDetails();
}

export const reviewDetails = getCommonCard({
  header,
  reviewPropertyInfo,
  reviewAuction,
  reviewAdditional,
  companyDetails,
  firmDetails, 
  proprietorDetails,
  reviewGroundRent,
  reviewLicenseFee,
  reviewAdvanceRent,
  reviewSecurity,
  reviewRentSummary,
  consolidatedPayment
})