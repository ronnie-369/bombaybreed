export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ab_experiments: {
        Row: {
          created_at: string
          device_type: string | null
          event_type: string
          experiment: string
          id: string
          metadata: Json
          page_path: string | null
          variant: string
          visitor_id: string
        }
        Insert: {
          created_at?: string
          device_type?: string | null
          event_type: string
          experiment: string
          id?: string
          metadata?: Json
          page_path?: string | null
          variant: string
          visitor_id: string
        }
        Update: {
          created_at?: string
          device_type?: string | null
          event_type?: string
          experiment?: string
          id?: string
          metadata?: Json
          page_path?: string | null
          variant?: string
          visitor_id?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_date: string
          preferred_time: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_date: string
          preferred_time: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_date?: string
          preferred_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      cached_blog_posts: {
        Row: {
          created_at: string
          date: string
          description: string
          fetched_at: string
          gradient: string
          id: string
          image: string
          subtitle: string | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          fetched_at?: string
          gradient: string
          id: string
          image: string
          subtitle?: string | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          fetched_at?: string
          gradient?: string
          id?: string
          image?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      carbon_market_data: {
        Row: {
          created_at: string
          date: string
          id: string
          market_segment: string
          notes: string | null
          price_inr: number
          price_usd: number | null
          source: string | null
          updated_at: string
          volume_tonnes: number | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          market_segment: string
          notes?: string | null
          price_inr: number
          price_usd?: number | null
          source?: string | null
          updated_at?: string
          volume_tonnes?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          market_segment?: string
          notes?: string | null
          price_inr?: number
          price_usd?: number | null
          source?: string | null
          updated_at?: string
          volume_tonnes?: number | null
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company_name: string | null
          created_at: string
          designation: string | null
          email: string
          form_type: string
          id: string
          marketing_consent: boolean
          name: string
          phone: string | null
          report_requested: string
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          designation?: string | null
          email: string
          form_type?: string
          id?: string
          marketing_consent?: boolean
          name: string
          phone?: string | null
          report_requested: string
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          form_type?: string
          id?: string
          marketing_consent?: boolean
          name?: string
          phone?: string | null
          report_requested?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          marketing_consent: boolean
          phone: string
          report_requested: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          marketing_consent?: boolean
          phone: string
          report_requested: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          marketing_consent?: boolean
          phone?: string
          report_requested?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
          unsubscribe_token: string | null
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string | null
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string | null
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_interactions: {
        Row: {
          created_at: string
          form_completed: boolean
          id: string
          personality_selected: string
        }
        Insert: {
          created_at?: string
          form_completed?: boolean
          id?: string
          personality_selected: string
        }
        Update: {
          created_at?: string
          form_completed?: boolean
          id?: string
          personality_selected?: string
        }
        Relationships: []
      }
      report_downloads: {
        Row: {
          downloaded_at: string
          id: string
          lead_id: string
          report_name: string
        }
        Insert: {
          downloaded_at?: string
          id?: string
          lead_id: string
          report_name: string
        }
        Update: {
          downloaded_at?: string
          id?: string
          lead_id?: string
          report_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_downloads_submission_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_capabilities: {
        Row: {
          buyer_intent: Database["public"]["Enums"]["intent_level"] | null
          contract_value: Database["public"]["Enums"]["intent_level"] | null
          conversion_cta: string | null
          created_at: string
          decision_maker: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          buyer_intent?: Database["public"]["Enums"]["intent_level"] | null
          contract_value?: Database["public"]["Enums"]["intent_level"] | null
          conversion_cta?: string | null
          created_at?: string
          decision_maker?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          buyer_intent?: Database["public"]["Enums"]["intent_level"] | null
          contract_value?: Database["public"]["Enums"]["intent_level"] | null
          conversion_cta?: string | null
          created_at?: string
          decision_maker?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_geographies: {
        Row: {
          capital_presence: string | null
          created_at: string
          description: string | null
          dominant_industries: string[] | null
          energy_profile: string | null
          geo_type: Database["public"]["Enums"]["geo_type"]
          id: string
          is_active: boolean
          name: string
          regulatory_context: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          capital_presence?: string | null
          created_at?: string
          description?: string | null
          dominant_industries?: string[] | null
          energy_profile?: string | null
          geo_type?: Database["public"]["Enums"]["geo_type"]
          id?: string
          is_active?: boolean
          name: string
          regulatory_context?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          capital_presence?: string | null
          created_at?: string
          description?: string | null
          dominant_industries?: string[] | null
          energy_profile?: string | null
          geo_type?: Database["public"]["Enums"]["geo_type"]
          id?: string
          is_active?: boolean
          name?: string
          regulatory_context?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_industries: {
        Row: {
          created_at: string
          description: string | null
          emission_profile: string | null
          energy_intensity: Database["public"]["Enums"]["intent_level"] | null
          id: string
          is_active: boolean
          name: string
          regulation_exposure: string[] | null
          slug: string
          typical_roles: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          emission_profile?: string | null
          energy_intensity?: Database["public"]["Enums"]["intent_level"] | null
          id?: string
          is_active?: boolean
          name: string
          regulation_exposure?: string[] | null
          slug: string
          typical_roles?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          emission_profile?: string | null
          energy_intensity?: Database["public"]["Enums"]["intent_level"] | null
          id?: string
          is_active?: boolean
          name?: string
          regulation_exposure?: string[] | null
          slug?: string
          typical_roles?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_pages: {
        Row: {
          capability_id: string | null
          content_sections: Json | null
          created_at: string
          direct_answer_block: string | null
          faq_items: Json | null
          geography_id: string | null
          h1_headline: string
          id: string
          industry_id: string | null
          internal_links: Json | null
          is_published: boolean
          meta_description: string | null
          meta_title: string
          page_type: Database["public"]["Enums"]["page_type"]
          priority: number | null
          regulation_id: string | null
          schema_data: Json | null
          slug: string
          updated_at: string
        }
        Insert: {
          capability_id?: string | null
          content_sections?: Json | null
          created_at?: string
          direct_answer_block?: string | null
          faq_items?: Json | null
          geography_id?: string | null
          h1_headline: string
          id?: string
          industry_id?: string | null
          internal_links?: Json | null
          is_published?: boolean
          meta_description?: string | null
          meta_title: string
          page_type: Database["public"]["Enums"]["page_type"]
          priority?: number | null
          regulation_id?: string | null
          schema_data?: Json | null
          slug: string
          updated_at?: string
        }
        Update: {
          capability_id?: string | null
          content_sections?: Json | null
          created_at?: string
          direct_answer_block?: string | null
          faq_items?: Json | null
          geography_id?: string | null
          h1_headline?: string
          id?: string
          industry_id?: string | null
          internal_links?: Json | null
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string
          page_type?: Database["public"]["Enums"]["page_type"]
          priority?: number | null
          regulation_id?: string | null
          schema_data?: Json | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_pages_capability_id_fkey"
            columns: ["capability_id"]
            isOneToOne: false
            referencedRelation: "seo_capabilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_pages_geography_id_fkey"
            columns: ["geography_id"]
            isOneToOne: false
            referencedRelation: "seo_geographies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_pages_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "seo_industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_pages_regulation_id_fkey"
            columns: ["regulation_id"]
            isOneToOne: false
            referencedRelation: "seo_regulations"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_regulations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          jurisdiction: string | null
          name: string
          risk_type: string | null
          slug: string
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency_level"] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          jurisdiction?: string | null
          name: string
          risk_type?: string | null
          slug: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          jurisdiction?: string | null
          name?: string
          risk_type?: string | null
          slug?: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Relationships: []
      }
      tcd_payments: {
        Row: {
          amount_inr: number
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          paid_at: string | null
          provider: string
          provider_payment_id: string | null
          status: Database["public"]["Enums"]["tcd_payment_status"]
          subscription_id: string
          updated_at: string
        }
        Insert: {
          amount_inr: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          provider?: string
          provider_payment_id?: string | null
          status?: Database["public"]["Enums"]["tcd_payment_status"]
          subscription_id: string
          updated_at?: string
        }
        Update: {
          amount_inr?: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          provider?: string
          provider_payment_id?: string | null
          status?: Database["public"]["Enums"]["tcd_payment_status"]
          subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tcd_payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "tcd_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      tcd_report_views: {
        Row: {
          id: string
          report_id: string
          subscriber_id: string | null
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          report_id: string
          subscriber_id?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          subscriber_id?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tcd_report_views_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "tcd_reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tcd_report_views_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "tcd_subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      tcd_reports: {
        Row: {
          body_html: string | null
          category: string | null
          cover_image_url: string | null
          created_at: string
          id: string
          is_published: boolean
          published_at: string | null
          reading_minutes: number | null
          required_tier_rank: number
          slug: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body_html?: string | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          reading_minutes?: number | null
          required_tier_rank?: number
          slug: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          body_html?: string | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          reading_minutes?: number | null
          required_tier_rank?: number
          slug?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tcd_subscribers: {
        Row: {
          company: string | null
          country: string | null
          created_at: string
          designation: string | null
          email: string
          full_name: string
          id: string
          marketing_consent: boolean
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          country?: string | null
          created_at?: string
          designation?: string | null
          email: string
          full_name: string
          id?: string
          marketing_consent?: boolean
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          country?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          full_name?: string
          id?: string
          marketing_consent?: boolean
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tcd_subscriptions: {
        Row: {
          admin_notes: string | null
          cancelled_at: string | null
          created_at: string
          expires_at: string | null
          id: string
          provider: string | null
          provider_subscription_id: string | null
          starts_at: string | null
          status: Database["public"]["Enums"]["tcd_subscription_status"]
          subscriber_id: string
          tier_id: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          cancelled_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          provider?: string | null
          provider_subscription_id?: string | null
          starts_at?: string | null
          status?: Database["public"]["Enums"]["tcd_subscription_status"]
          subscriber_id: string
          tier_id: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          cancelled_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          provider?: string | null
          provider_subscription_id?: string | null
          starts_at?: string | null
          status?: Database["public"]["Enums"]["tcd_subscription_status"]
          subscriber_id?: string
          tier_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tcd_subscriptions_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "tcd_subscribers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tcd_subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "tcd_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      tcd_tiers: {
        Row: {
          billing_period: Database["public"]["Enums"]["tcd_billing_period"]
          created_at: string
          description: string | null
          features: Json
          id: string
          is_active: boolean
          name: string
          price_inr: number
          rank: number
          slug: string
          sort_order: number
          tagline: string | null
          updated_at: string
        }
        Insert: {
          billing_period?: Database["public"]["Enums"]["tcd_billing_period"]
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          name: string
          price_inr?: number
          rank?: number
          slug: string
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          billing_period?: Database["public"]["Enums"]["tcd_billing_period"]
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          name?: string
          price_inr?: number
          rank?: number
          slug?: string
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      tcd_current_tier_rank: { Args: never; Returns: number }
      tcd_log_report_view: { Args: { _report_slug: string }; Returns: string }
      tcd_mock_activate_subscription: {
        Args: { _tier_id: string }
        Returns: string
      }
      tcd_user_has_report_access: {
        Args: { _report_slug: string }
        Returns: boolean
      }
      unsubscribe_newsletter: { Args: { token: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      geo_type: "state" | "city" | "country" | "region"
      intent_level: "high" | "medium" | "low"
      page_type:
        | "capability"
        | "industry"
        | "geography"
        | "regulation"
        | "problem"
        | "combined"
      tcd_billing_period: "monthly" | "quarterly" | "annual"
      tcd_payment_status: "pending" | "succeeded" | "failed" | "refunded"
      tcd_subscription_status:
        | "pending"
        | "active"
        | "paused"
        | "cancelled"
        | "expired"
      urgency_level: "high" | "medium" | "low"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      geo_type: ["state", "city", "country", "region"],
      intent_level: ["high", "medium", "low"],
      page_type: [
        "capability",
        "industry",
        "geography",
        "regulation",
        "problem",
        "combined",
      ],
      tcd_billing_period: ["monthly", "quarterly", "annual"],
      tcd_payment_status: ["pending", "succeeded", "failed", "refunded"],
      tcd_subscription_status: [
        "pending",
        "active",
        "paused",
        "cancelled",
        "expired",
      ],
      urgency_level: ["high", "medium", "low"],
    },
  },
} as const
