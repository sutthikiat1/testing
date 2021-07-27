import { actions as searchActions } from "./SearchContacts";
import { actions as contactDetailsActions } from "./ContactDetails";

export const updateSearchPhrase =
  (newPhrase) =>
  (dispatch, getState, { httpApi }) => {
    dispatch(searchActions.updateSearchPhraseStart({ newPhrase }));
    httpApi
      .getFirst5MatchingContacts({ namePart: newPhrase })
      .then(({ data }) => {
        const matchingContacts = data.map((contact) => ({
          id: contact.id,
          value: contact.name,
        }));
        // TODO something is wrong here
        dispatch(searchActions.updateSearchPhraseSuccess({ matchingContacts }));
      })
      .catch(() => {
        dispatch(searchActions.updateSearchPhraseFailure());
        // TODO something is missing here
      });
  };

export const selectMatchingContact =
  (selectedMatchingContact) =>
  (dispatch, getState, { httpApi, dataCache }) => {
    // TODO something is missing here
    const getContactDetails = ({ id }) => {
      return httpApi.getContact({ contactId: id }).then(({ data }) => ({
        id: data.id,
        name: data.name,
        phone: data.phone,
        addressLines: data.addressLines,
      }));
    };

    // dispatch(searchActions.selectMatchingContact({ selectedMatchingContact }));

    dispatch(contactDetailsActions.fetchContactDetailsStart());

    getContactDetails({ id: selectedMatchingContact })
      .then((contactDetails) => {
        // TODO something is missing here
        dataCache.store({
          key: contactDetails.id,
        });
        // TODO something is wrong here
        dispatch(
          contactDetailsActions.fetchContactDetailsSuccess({ contactDetails })
        );
      })
      .catch(() => {
        dispatch(contactDetailsActions.fetchContactDetailsFailure());
      });
  };
