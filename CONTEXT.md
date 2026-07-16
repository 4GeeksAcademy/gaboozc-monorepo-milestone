# AlphaDev Studios — Project Context

## Company profile
- Company: AlphaDev Studios
- Sector: AI-first digital engineering and web operations
- Markets served: Mexico, United States, Venezuela
- Delivery model: Website + operational tooling + automation

## Positioning and competitive advantages
- Production-ready admin dashboards from day one.
- Segmented pricing and delivery by market profile.
- Automation-first implementation to reduce manual operations.

## Required application form fields
Use these exact names and entity IDs:

1. Full name
- id: fullName
- name: fullName
- type: text
- required: true

2. Work email
- id: email
- name: email
- type: email
- required: true

3. Phone
- id: phone
- name: phone
- type: tel
- required: true

4. Role
- id: role
- name: role
- type: text
- required: true

5. Company name
- id: companyName
- name: companyName
- type: text
- required: true

6. Business niche
- id: businessNiche
- name: businessNiche
- type: text
- required: true

7. Primary market segment
- id: marketSegment
- name: marketSegment
- type: select
- required: true
- allowed values:
  - pyme_latam
  - startup_usd
  - venezuela

8. Team size
- id: teamSize
- name: teamSize
- type: number
- required: true

9. Services interested (multi-select)
- name: services
- type: checkbox[]
- required rule: at least one selected
- allowed values:
  - template_website
  - admin_dashboard
  - alphadev_360
  - automation

10. Estimated budget
- id: budget
- name: budget
- type: number
- required: true

11. Timeline in weeks
- id: timelineWeeks
- name: timelineWeeks
- type: number
- required: true

12. Operational pain points
- id: painPoints
- name: painPoints
- type: textarea
- required: true

13. Project vision (90 days)
- id: projectVision
- name: projectVision
- type: textarea
- required: true

14. Consent terms
- id: terms
- name: terms
- type: checkbox
- required: true

## Domain validation rules
- fullName: at least 3 characters and minimum 2 words.
- email: valid business email format.
- phone: international format, 8 to 20 chars, allows +, spaces, parentheses and hyphen.
- role: minimum 2 characters.
- companyName: minimum 2 characters.
- businessNiche: minimum 3 characters.
- marketSegment: required selection from allowed values.
- teamSize: integer from 1 to 500.
- budget: positive number and within selected segment range.
- timelineWeeks: integer from 2 to 24.
- painPoints: minimum 20 characters.
- projectVision: minimum 30 characters.
- terms: must be accepted.
- services: at least one option selected.

## Segment budget constraints
- pyme_latam: 15000 to 250000 MXN
- startup_usd: 3000 to 120000 USD
- venezuela: 500 to 25000 USD
