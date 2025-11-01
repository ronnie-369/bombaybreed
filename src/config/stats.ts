/**
 * Climate Desk Statistics
 * Update these values periodically to reflect current metrics
 */

export const climateDesk = {
  // Newsletter subscriber count from Substack
  // Last updated: [Update date when changing]
  subscriberCount: 5000,
  
  // Formatted subscriber count for display
  get subscriberCountFormatted() {
    return this.subscriberCount.toLocaleString();
  },
  
  // Get subscriber text with threshold formatting
  get subscriberText() {
    if (this.subscriberCount >= 1000) {
      return `over ${Math.floor(this.subscriberCount / 1000) * 1000}`;
    }
    return this.subscriberCount.toString();
  }
};
