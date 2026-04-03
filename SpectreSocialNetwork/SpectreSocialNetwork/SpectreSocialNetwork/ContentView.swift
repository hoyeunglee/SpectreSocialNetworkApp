import SwiftUI
import Combine

final class AppSession: ObservableObject {
    @Published var isAuthenticated: Bool = false
    @Published var currentUser: User? = nil
}

struct ContentView: View {
    @StateObject private var session = AppSession()

    var body: some View {
        Group {
            if session.isAuthenticated {
                MainTabView()
            } else {
                LoginView()
            }
        }
        .environmentObject(session)
    }
}

#Preview {
    ContentView()
}
