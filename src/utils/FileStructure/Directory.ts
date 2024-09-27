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
}

// EXAMPLE ROOT DIRECTORY

export const exampleRoot: Directory = {
  name: "root",
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
  ],
  subdirectories: [
    {
      name: "HR",
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
  ],
};
