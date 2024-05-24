export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      follow: {
        Row: {
          follower_id: string
          following_id: string
        }
        Insert: {
          follower_id?: string
          following_id?: string
        }
        Update: {
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "follow_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "follower_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follower_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      habit: {
        Row: {
          created_at: string
          creator_user_id: string
          daily_goal_unit: string
          end_date: string
          frequency: Json
          habit_id: string
          is_public: boolean
          lastest_message_update_time: string
          message: string
          num_daily_goal_unit: number
          picture_url: string
          start_date: string
          title: string
        }
        Insert: {
          created_at?: string
          creator_user_id?: string
          daily_goal_unit: string
          end_date: string
          frequency: Json
          habit_id?: string
          is_public?: boolean
          lastest_message_update_time?: string
          message?: string
          num_daily_goal_unit: number
          picture_url?: string
          start_date: string
          title?: string
        }
        Update: {
          created_at?: string
          creator_user_id?: string
          daily_goal_unit?: string
          end_date?: string
          frequency?: Json
          habit_id?: string
          is_public?: boolean
          lastest_message_update_time?: string
          message?: string
          num_daily_goal_unit?: number
          picture_url?: string
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_creator_user_id_fkey"
            columns: ["creator_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      join: {
        Row: {
          habit_id: string
          habit_instance_id: string
          user_id: string
        }
        Insert: {
          habit_id?: string
          habit_instance_id?: string
          user_id?: string
        }
        Update: {
          habit_id?: string
          habit_instance_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "join_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habit"
            referencedColumns: ["habit_id"]
          },
          {
            foreignKeyName: "join_habit_instance_id_fkey"
            columns: ["habit_instance_id"]
            isOneToOne: false
            referencedRelation: "habit"
            referencedColumns: ["habit_id"]
          },
        ]
      }
      post: {
        Row: {
          content: string | null
          created_at: string | null
          creator_user_id: string
          habit_id: string
          post_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          creator_user_id: string
          habit_id: string
          post_id?: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          creator_user_id?: string
          habit_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_creator_user_id_fkey1"
            columns: ["creator_user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "post_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habit"
            referencedColumns: ["habit_id"]
          },
        ]
      }
      profile: {
        Row: {
          avatar_url: string | null
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          user_id: string
          username?: string
        }
        Update: {
          avatar_url?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      react_to: {
        Row: {
          post_id: string
          reaction_type: Database["public"]["Enums"]["reaction-type"]
          user_id: string
        }
        Insert: {
          post_id?: string
          reaction_type?: Database["public"]["Enums"]["reaction-type"]
          user_id: string
        }
        Update: {
          post_id?: string
          reaction_type?: Database["public"]["Enums"]["reaction-type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "react_to_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "react_to_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      record: {
        Row: {
          created_at: string
          habit_id: string
          num_completed_unit: number
          record_id: string
        }
        Insert: {
          created_at?: string
          habit_id: string
          num_completed_unit?: number
          record_id?: string
        }
        Update: {
          created_at?: string
          habit_id?: string
          num_completed_unit?: number
          record_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "record_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habit"
            referencedColumns: ["habit_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      "reaction-type": "like" | "rage" | "poop" | "laugh" | "meow" | "heart"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
