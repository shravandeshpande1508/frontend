import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;

const CustomTabContainer = Loadable({
  loader: () => import("./CustomTabContainer"),
  loading: () => <Loading />
});
const LabelContainer = Loadable({
  loader: () => import("./LabelContainer"),
  loading: () => <Loading />
});

const CheckboxContainer = Loadable({
  loader: () => import("./CheckboxContainer"),
  loading: () => <Loading />
});
const DownloadFileContainer = Loadable({
  loader: () => import("./DownloadFileContainer"),
  loading: () => <Loading />
});
const EstimateCardContainer = Loadable({
  loader: () => import("./EstimateCardContainer"),
  loading: () => <Loading />
});
const AutosuggestContainer = Loadable({
  loader: () => import("./AutosuggestContainer"),
  loading: () => <Loading />
});
const DocumentListContainer = Loadable({
  loader: () => import("./DocumentListContainer"),
  loading: () => <Loading />
});
const PaymentRedirectPage = Loadable({
  loader: () => import("./PaymentRedirectPage"),
  loading: () => <Loading />
});

const DialogContainer = Loadable({
  loader: () => import("./DialogContainer"),
  loading: () => <Loading />
});

const DeleteConfirmationContainer = Loadable({
  loader: () => import("./DeleteConfirmationContainer"),
  loading: () => <Loading />
});

const ViewBreakupContainer = Loadable({
  loader: () => import("./ViewbreakupDialogContainer"),
  loading: () => <Loading />
});

const CustomizeTableContainer = Loadable({
  loader: () => import("./CustomizeTableContainer"),
  loading: () => <Loading />
});
const PopupContainer = Loadable({
  loader: () => import("./PopupContainer"),
  loading: () => <Loading />
});

const ForwardContainer = Loadable({
  loader: () => import("./ForwardContainer"),
  loading: () => <Loading />
})

const ReturnCloseConfirmationContainer = Loadable({
  loader: () => import("./ReturnCloseConfirmationContainer"),
  loading: () => <Loading />
})

const UpdateContactContainer = Loadable({
  loader: () => import("./UpdateContactContainer"),
  loading: () => <Loading />
})

export {
  CustomTabContainer,
  LabelContainer,
  CheckboxContainer,
  DownloadFileContainer,
  EstimateCardContainer,
  AutosuggestContainer,
  DocumentListContainer,
  PaymentRedirectPage,
  ViewBreakupContainer,
  DialogContainer,
  DeleteConfirmationContainer,
  PopupContainer,
  CustomizeTableContainer,
  ForwardContainer,
  ReturnCloseConfirmationContainer,
  UpdateContactContainer
};
