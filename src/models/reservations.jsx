const initialState = {
  data: [],
  search: '',
  filters: {

  },
  loading: false,
  error: false,
};

export default {
  namespace: 'reservations',
  state: initialState,
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
    resetState() {
      return {
        ...initialState,
      };
    },
  },
  effects: {
        * GET_RESERVATIONS({ payload }, { put,
      }) {
        yield put({
          type: 'setState',
          payload: {
              data: payload,
          },
        });
      },

    *SET_SEARCH({ payload }, { put, select }) {
      const { search, reservations } = payload;
      const { filters } = yield select((state) => state.reservations);

      yield put({
        type: 'setState',
        payload: {
          search,
        },
      });

      const searchLower = search.toLowerCase();

      // Filter the reservations array based on the search criteria
      const filteredReservations = reservations.filter((reservation) => {
        // Convert the first and last names to lowercase for case-insensitive comparison
        const firstNameLower = reservation.customer.firstName.toLowerCase();
        const lastNameLower = reservation.customer.lastName.toLowerCase();
      
        // Check if the reservation matches the applied filters
        const matchesFilters = Object.keys(filters).every(filterKey => {
          const filterValue = filters[filterKey];
          // If filter is not applied, return true to include the reservation
          if (!filterValue) return true;
          if (filterKey === 'date') {
            // Convert the reservation start date to a Date object for comparison
            const reservationStartDate = new Date(reservation.start);
            // Convert the filter date to a Date object
            const filterDate = new Date(filterValue);
            // Compare the reservation start date with the filter date
            return reservationStartDate.toDateString() === filterDate.toDateString();
          }
          // Otherwise, check if reservation property matches filter value
          return reservation[filterKey] === filterValue;
        });
      
        // Check if either the first name or last name includes the search string
        const matchesSearch = (
          firstNameLower.includes(searchLower) ||
          lastNameLower.includes(searchLower)
        );
      
        // Include reservation if it matches all applied filters and the search criteria
        return matchesFilters && matchesSearch;
      });
      

      yield put({
        type: 'setState',
        payload: {
          data: filteredReservations,
        },
      });
    },

    * SET_FILTERS({ payload }, { put, select }) {
      const { filterType, filterValue } = payload;
      const { filters } = yield select((state) => state.reservations);

      yield put({
        type: 'setState',
        payload: {
          filters: {
            ...filters,
            [filterType]: filterValue,
          },
        },
      });
    },

    * FILTER_RESERVATIONS({ payload }, { put, select }) {
      const { filters, search } = yield select((state) => state.reservations);
      const { reservations } = payload;

      const filteredReservations = reservations.filter((reservation) => {
      
        // Check if the reservation matches the applied filters
        const matchesFilters = Object.keys(filters).every(filterKey => {
          const filterValue = filters[filterKey];
          // If filter is not applied or is the date filter and no date is provided, return true to include the reservation
          if (!filterValue || (filterKey === 'date' && !filterValue)) return true;
          // Special handling for the date filter
          if (filterKey === 'date') {
            // Convert the reservation start date to a Date object for comparison
            const reservationStartDate = new Date(reservation.start);
            // Convert the filter date to a Date object
            const filterDate = new Date(filterValue);
            // Compare the reservation start date with the filter date
            return reservationStartDate.toDateString() === filterDate.toDateString();
          }
          // Otherwise, check if reservation property matches filter value
          return reservation[filterKey] === filterValue;
        });
      
        // Check if either the first name or last name includes the search string
        const matchesSearch = search?.trim() ? 
            `${reservation.customer.firstName} ${reservation.customer.lastName}`.toLowerCase().includes(search.toLowerCase()) :
            true; // If no search string is provided, always return true
        
      
        // Include reservation if it matches all applied filters and the search criteria
        return matchesFilters && matchesSearch;
      });
      
      yield put({
        type: 'setState',
        payload: {
          data: filteredReservations,
        },
      })
    },

    * RESET_FILTERS({ payload }, { put }) {
      const { reservations } = payload;
      yield put({
        type: 'setState',
        payload: {
          search: '',
          filters: {},
          data: reservations,
        },
      });
    }

  },
};
