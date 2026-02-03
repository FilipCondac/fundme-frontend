"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class Web3ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Web3ErrorBoundary caught an error:", error, errorInfo);

    if (
      error.message.includes("user rejected") ||
      error.message.includes("User denied")
    ) {
      console.log("User rejected transaction");
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">
                Web3 Component Error
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  There was an error with the blockchain interaction. This could
                  be due to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Network connectivity issues</li>
                  <li>Wallet connection problems</li>
                  <li>Contract interaction failures</li>
                  <li>Insufficient gas or funds</li>
                </ul>
              </div>
              {this.state.error && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs text-red-600 hover:text-red-800">
                    Technical details
                  </summary>
                  <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto max-h-24">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={this.handleReset}
                  className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm bg-white text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
