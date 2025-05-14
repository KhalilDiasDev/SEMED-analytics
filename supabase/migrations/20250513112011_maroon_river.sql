/*
  # Initial database schema for EduAnalytics

  1. New Tables
    - schools
      - id (uuid, primary key)
      - name (text)
      - location (text)
      - total_students (integer)
      - region (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - teachers
      - id (uuid, primary key)
      - school_id (uuid, foreign key)
      - name (text)
      - qualification (text)
      - experience (integer)
      - subjects (text[])
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - students
      - id (uuid, primary key)
      - school_id (uuid, foreign key)
      - name (text)
      - grade (text)
      - gender (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - performance_records
      - id (uuid, primary key)
      - student_id (uuid, foreign key)
      - subject (text)
      - score (numeric)
      - semester (text)
      - year (integer)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Schools table
CREATE TABLE schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  total_students integer NOT NULL DEFAULT 0,
  region text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read schools"
  ON schools
  FOR SELECT
  TO authenticated
  USING (true);

-- Teachers table
CREATE TABLE teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  name text NOT NULL,
  qualification text NOT NULL,
  experience integer NOT NULL DEFAULT 0,
  subjects text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read teachers"
  ON teachers
  FOR SELECT
  TO authenticated
  USING (true);

-- Students table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  name text NOT NULL,
  grade text NOT NULL,
  gender text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

-- Performance records table
CREATE TABLE performance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  subject text NOT NULL,
  score numeric NOT NULL CHECK (score >= 0 AND score <= 100),
  semester text NOT NULL,
  year integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE performance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read performance records"
  ON performance_records
  FOR SELECT
  TO authenticated
  USING (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_schools_updated_at
  BEFORE UPDATE ON schools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();