// Minimal stubs to satisfy build in this file
enum Gender: String, CaseIterable, Identifiable {
    case male, female, other
    var id: String { rawValue }
}

struct User: Identifiable {
    var id: UUID = UUID()
    var name: String = ""
    var email: String = ""
    var gender: Gender = .other
}

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

// Minimal views to satisfy build in this file
struct LoginView: View {
    @EnvironmentObject private var session: AppSession
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var error: String? = nil
    private let demoEmail = "demo@example.com"
    private let demoPassword = "Password123"

    var body: some View {
        VStack(spacing: 16) {
            Text("Login").font(.largeTitle).bold()
            TextField("Email", text: $email)
                .textContentType(.emailAddress)
                .keyboardType(.emailAddress)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .padding().background(.ultraThinMaterial).clipShape(RoundedRectangle(cornerRadius: 12))
            SecureField("Password", text: $password)
                .textContentType(.password)
                .padding().background(.ultraThinMaterial).clipShape(RoundedRectangle(cornerRadius: 12))
            if let error = error {
                Text(error)
                    .foregroundStyle(.red)
            }
            Button("Sign In") {
                if email.lowercased() == demoEmail.lowercased() && password == demoPassword {
                    var user = User()
                    user.name = "Demo User"
                    user.email = email
                    session.currentUser = user
                    session.isAuthenticated = true
                    error = nil
                } else {
                    error = "Invalid email or password. Try demo@example.com / Password123"
                }
            }
            .disabled(email.isEmpty || password.isEmpty)
            .buttonStyle(.borderedProminent)
            Spacer()
        }
        .padding()
    }
}

struct MainTabView: View {
    var body: some View {
        TabView {
            Text("Home").tabItem { Label("Home", systemImage: "house.fill") }
            Text("Search").tabItem { Label("Search", systemImage: "magnifyingglass") }
            Text("Profile").tabItem { Label("Profile", systemImage: "person.crop.circle") }
            SettingsStub().tabItem { Label("Settings", systemImage: "gear") }
        }
    }
}

private struct SettingsStub: View {
    @EnvironmentObject private var session: AppSession
    var body: some View {
        VStack(spacing: 12) {
            Text("Settings")
            Button("Log Out", role: .destructive) {
                session.isAuthenticated = false
                session.currentUser = nil
            }
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
