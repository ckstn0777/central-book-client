import getFirebaseAnalytics from './getFirebaseAnalytics'

const logger = {
  get analytics() {
    return getFirebaseAnalytics()
  },
  signUp() {
    this.analytics?.logEvent('sign_up')
  },
  login() {
    this.analytics?.logEvent('login')
  },
  pageView(location: string) {
    this.analytics?.logEvent('page_view', {
      page_location: location,
    })
  },
  createBookShelve() {
    this.analytics?.logEvent('create_book_shelve')
  },
  createBookReview() {
    this.analytics?.logEvent('create_book_review')
  },
}

declare module '@firebase/analytics-types' {
  interface EventParams {
    page_location?: string
    id?: string | number
  }
  type ExtendedEventNameString =
    | EventNameString
    | 'create_book_shelve'
    | 'create_book_review'

  interface FirebaseAnalytics {
    logEvent(
      eventName: ExtendedEventNameString,
      eventParmas?: EventParams,
      options?: AnalyticsCallOptions
    ): void
  }
}

export default logger
