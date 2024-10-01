// UPDATED BACKEND FILE MODEL AS NEEDED WHEN CHANGING
export interface File {
  name: string;
  created_at: Date;
  created_by: string;
  file_size: number;
}

// UPDATED BACKEND DIRECTORY MODEL AS NEEDED WHEN CHANGING
export interface Directory {
  name: string;
  files: File[];
  subdirectories: Directory[];
  created_at: Date;
  created_by: string;
}

// EXAMPLE ROOT DIRECTORY

export const exampleRoot: Directory = {
  name: "Home",
  created_at: new Date("2023-01-01"),
  created_by: "Admin",
  files: [
    {
      name: "company_overview.pdf",
      created_at: new Date("2023-01-15"),
      created_by: "John Doe",
      file_size: 2500000,
    },
    {
      name: "annual_report_2022.pdf",
      created_at: new Date("2023-03-01"),
      created_by: "Jane Smith",
      file_size: 5000000,
    },
    {
      name: "corporate_strategy.pptx",
      created_at: new Date("2023-05-10"),
      created_by: "CEO",
      file_size: 3500000,
    },
    {
      name: "file_01.txt",
      created_at: new Date("2023-01-01"),
      created_by: "User1",
      file_size: 1000,
    },
    {
      name: "file_02.txt",
      created_at: new Date("2023-01-02"),
      created_by: "User2",
      file_size: 2000,
    },
    {
      name: "file_03.txt",
      created_at: new Date("2023-01-03"),
      created_by: "User3",
      file_size: 3000,
    },
    {
      name: "file_04.txt",
      created_at: new Date("2023-01-04"),
      created_by: "User4",
      file_size: 4000,
    },
    {
      name: "file_05.txt",
      created_at: new Date("2023-01-05"),
      created_by: "User5",
      file_size: 5000,
    },
    {
      name: "file_06.txt",
      created_at: new Date("2023-01-06"),
      created_by: "User6",
      file_size: 6000,
    },
    {
      name: "file_07.txt",
      created_at: new Date("2023-01-07"),
      created_by: "User7",
      file_size: 7000,
    },
    {
      name: "file_08.txt",
      created_at: new Date("2023-01-08"),
      created_by: "User8",
      file_size: 8000,
    },
    {
      name: "file_09.txt",
      created_at: new Date("2023-01-09"),
      created_by: "User9",
      file_size: 9000,
    },
    {
      name: "file_10.txt",
      created_at: new Date("2023-01-10"),
      created_by: "User10",
      file_size: 10000,
    },
    {
      name: "file_11.txt",
      created_at: new Date("2023-01-11"),
      created_by: "User11",
      file_size: 11000,
    },
    {
      name: "file_12.txt",
      created_at: new Date("2023-01-12"),
      created_by: "User12",
      file_size: 12000,
    },
    {
      name: "file_13.txt",
      created_at: new Date("2023-01-13"),
      created_by: "User13",
      file_size: 13000,
    },
    {
      name: "file_14.txt",
      created_at: new Date("2023-01-14"),
      created_by: "User14",
      file_size: 14000,
    },
    {
      name: "file_15.txt",
      created_at: new Date("2023-01-15"),
      created_by: "User15",
      file_size: 15000,
    },
    {
      name: "file_16.txt",
      created_at: new Date("2023-01-16"),
      created_by: "User16",
      file_size: 16000,
    },
    {
      name: "file_17.txt",
      created_at: new Date("2023-01-17"),
      created_by: "User17",
      file_size: 17000,
    },
    {
      name: "file_18.txt",
      created_at: new Date("2023-01-18"),
      created_by: "User18",
      file_size: 18000,
    },
    {
      name: "file_19.txt",
      created_at: new Date("2023-01-19"),
      created_by: "User19",
      file_size: 19000,
    },
    {
      name: "file_20.txt",
      created_at: new Date("2023-01-20"),
      created_by: "User20",
      file_size: 20000,
    },
    {
      name: "file_21.txt",
      created_at: new Date("2023-01-21"),
      created_by: "User21",
      file_size: 21000,
    },
    {
      name: "file_22.txt",
      created_at: new Date("2023-01-22"),
      created_by: "User22",
      file_size: 22000,
    },
    {
      name: "file_23.txt",
      created_at: new Date("2023-01-23"),
      created_by: "User23",
      file_size: 23000,
    },
    {
      name: "file_24.txt",
      created_at: new Date("2023-01-24"),
      created_by: "User24",
      file_size: 24000,
    },
    {
      name: "file_25.txt",
      created_at: new Date("2023-01-25"),
      created_by: "User25",
      file_size: 25000,
    },
    {
      name: "file_26.txt",
      created_at: new Date("2023-01-26"),
      created_by: "User26",
      file_size: 26000,
    },
    {
      name: "file_27.txt",
      created_at: new Date("2023-01-27"),
      created_by: "User27",
      file_size: 27000,
    },
    {
      name: "file_28.txt",
      created_at: new Date("2023-01-28"),
      created_by: "User28",
      file_size: 28000,
    },
    {
      name: "file_29.txt",
      created_at: new Date("2023-01-29"),
      created_by: "User29",
      file_size: 29000,
    },
    {
      name: "file_30.txt",
      created_at: new Date("2023-01-30"),
      created_by: "User30",
      file_size: 30000,
    },
  ],
  subdirectories: [
    {
      name: "HR",
      created_at: new Date("2023-01-02"),
      created_by: "HR Admin",
      files: [
        {
          name: "employee_handbook.pdf",
          created_at: new Date("2022-12-01"),
          created_by: "HR Manager",
          file_size: 1500000,
        },
        {
          name: "vacation_policy.doc",
          created_at: new Date("2023-02-15"),
          created_by: "HR Manager",
          file_size: 500000,
        },
        {
          name: "performance_review_template.docx",
          created_at: new Date("2023-06-01"),
          created_by: "HR Director",
          file_size: 450000,
        },
      ],
      subdirectories: [
        {
          name: "Recruitment",
          created_at: new Date("2023-01-03"),
          created_by: "Recruitment Admin",
          files: [
            {
              name: "job_descriptions.doc",
              created_at: new Date("2023-04-01"),
              created_by: "Recruiter",
              file_size: 750000,
            },
            {
              name: "interview_questions.doc",
              created_at: new Date("2023-04-02"),
              created_by: "Recruiter",
              file_size: 600000,
            },
            {
              name: "candidate_evaluation_form.pdf",
              created_at: new Date("2023-06-15"),
              created_by: "HR Manager",
              file_size: 300000,
            },
          ],
          subdirectories: [],
        },
        {
          name: "Training",
          created_at: new Date("2023-01-04"),
          created_by: "Training Admin",
          files: [
            {
              name: "onboarding_checklist.pdf",
              created_at: new Date("2023-05-20"),
              created_by: "Training Coordinator",
              file_size: 250000,
            },
            {
              name: "leadership_training.pptx",
              created_at: new Date("2023-07-01"),
              created_by: "External Consultant",
              file_size: 4000000,
            },
          ],
          subdirectories: [],
        },
      ],
    },
    {
      name: "Finance",
      created_at: new Date("2023-01-05"),
      created_by: "Finance Admin",
      files: [
        {
          name: "Q1_financial_report.xlsx",
          created_at: new Date("2023-04-15"),
          created_by: "CFO",
          file_size: 1200000,
        },
        {
          name: "budget_2023.xlsx",
          created_at: new Date("2023-01-05"),
          created_by: "Financial Analyst",
          file_size: 900000,
        },
        {
          name: "tax_documents_2022.pdf",
          created_at: new Date("2023-03-30"),
          created_by: "Tax Specialist",
          file_size: 3000000,
        },
      ],
      subdirectories: [
        {
          name: "Invoices",
          created_at: new Date("2023-01-06"),
          created_by: "Invoices Admin",
          files: [
            {
              name: "invoice_001.pdf",
              created_at: new Date("2023-03-10"),
              created_by: "Accounting",
              file_size: 100000,
            },
            {
              name: "invoice_002.pdf",
              created_at: new Date("2023-03-20"),
              created_by: "Accounting",
              file_size: 120000,
            },
            {
              name: "invoice_003.pdf",
              created_at: new Date("2023-04-05"),
              created_by: "Accounting",
              file_size: 110000,
            },
          ],
          subdirectories: [],
        },
        {
          name: "Payroll",
          created_at: new Date("2023-01-07"),
          created_by: "Payroll Admin",
          files: [
            {
              name: "payroll_may_2023.xlsx",
              created_at: new Date("2023-05-31"),
              created_by: "Payroll Manager",
              file_size: 500000,
            },
            {
              name: "employee_benefits.pdf",
              created_at: new Date("2023-01-10"),
              created_by: "HR Specialist",
              file_size: 750000,
            },
          ],
          subdirectories: [],
        },
      ],
    },
    {
      name: "Projects",
      created_at: new Date("2023-01-08"),
      created_by: "Projects Admin",
      files: [
        {
          name: "project_status_overview.xlsx",
          created_at: new Date("2023-06-30"),
          created_by: "PMO Director",
          file_size: 800000,
        },
      ],
      subdirectories: [
        {
          name: "Project X",
          created_at: new Date("2023-01-09"),
          created_by: "Project X Admin",
          files: [
            {
              name: "project_plan.pdf",
              created_at: new Date("2023-02-01"),
              created_by: "Project Manager",
              file_size: 1800000,
            },
            {
              name: "requirements.doc",
              created_at: new Date("2023-02-10"),
              created_by: "Business Analyst",
              file_size: 700000,
            },
            {
              name: "design_mockups.zip",
              created_at: new Date("2023-03-15"),
              created_by: "UX Designer",
              file_size: 25000000,
            },
          ],
          subdirectories: [
            {
              name: "Technical Docs",
              created_at: new Date("2023-01-10"),
              created_by: "Technical Docs Admin",
              files: [
                {
                  name: "architecture_diagram.pdf",
                  created_at: new Date("2023-04-01"),
                  created_by: "System Architect",
                  file_size: 2000000,
                },
                {
                  name: "api_documentation.md",
                  created_at: new Date("2023-05-15"),
                  created_by: "Tech Lead",
                  file_size: 500000,
                },
              ],
              subdirectories: [],
            },
          ],
        },
        {
          name: "Project Y",
          created_at: new Date("2023-01-11"),
          created_by: "Project Y Admin",
          files: [
            {
              name: "progress_report.pdf",
              created_at: new Date("2023-04-20"),
              created_by: "Team Lead",
              file_size: 950000,
            },
            {
              name: "client_feedback.docx",
              created_at: new Date("2023-05-05"),
              created_by: "Account Manager",
              file_size: 400000,
            },
          ],
          subdirectories: [],
        },
        {
          name: "Project Z",
          created_at: new Date("2023-01-12"),
          created_by: "Project Z Admin",
          files: [
            {
              name: "kickoff_presentation.pptx",
              created_at: new Date("2023-07-01"),
              created_by: "Project Manager",
              file_size: 5000000,
            },
            {
              name: "budget_estimate.xlsx",
              created_at: new Date("2023-07-05"),
              created_by: "Financial Analyst",
              file_size: 300000,
            },
          ],
          subdirectories: [],
        },
      ],
    },
    {
      name: "Marketing",
      created_at: new Date("2023-01-13"),
      created_by: "Marketing Admin",
      files: [
        {
          name: "marketing_strategy_2023.pdf",
          created_at: new Date("2023-01-20"),
          created_by: "Marketing Director",
          file_size: 1500000,
        },
        {
          name: "brand_guidelines.pdf",
          created_at: new Date("2022-11-15"),
          created_by: "Brand Manager",
          file_size: 10000000,
        },
      ],
      subdirectories: [
        {
          name: "Campaigns",
          created_at: new Date("2023-01-14"),
          created_by: "Campaigns Admin",
          files: [
            {
              name: "summer_campaign_brief.docx",
              created_at: new Date("2023-05-01"),
              created_by: "Campaign Manager",
              file_size: 800000,
            },
            {
              name: "social_media_calendar.xlsx",
              created_at: new Date("2023-06-01"),
              created_by: "Social Media Specialist",
              file_size: 500000,
            },
          ],
          subdirectories: [],
        },
        {
          name: "Assets",
          created_at: new Date("2023-01-15"),
          created_by: "Assets Admin",
          files: [
            {
              name: "company_logo.ai",
              created_at: new Date("2022-10-01"),
              created_by: "Graphic Designer",
              file_size: 5000000,
            },
            {
              name: "product_photos.zip",
              created_at: new Date("2023-03-15"),
              created_by: "Photographer",
              file_size: 50000000,
            },
          ],
          subdirectories: [],
        },
      ],
    },
    {
      name: "NewFolder",
      created_at: new Date("2023-01-31"),
      created_by: "New Admin",
      files: [
        {
          name: "new_file.txt",
          created_at: new Date("2023-01-31"),
          created_by: "New Admin",
          file_size: 500,
        },
      ],
      subdirectories: [],
    },
  ],
};
