agreedisagree = [
    'Strongly Disagree',
    'Disagree',
    'Neither Agree nor Disagree',
    'Agree',
    'Strongly Agree'
]

assessment = {
    pages: [
            {label: "Project Completion Survey",
            noNewPage: true,
            questions:[
                {
                    type: "text",
                    label: "As part of our efforts to continuously improve how we deliver value to our clients, we're hoping you can answer a few questions about our latest project together."
                },
                {
                    type: "text",
                    label: "For the following questions, let us know how much you agree or disagree with each statement based on your relationship with us."
                },
                {
                    type: "grid",
                    category: 'Feedback',
                    labels: ["Dworin Consulting always delivered on their promises",
                    "My business is better off because I worked with Dworin Consulting",
                    "Dworin Consulting brings me new ideas",
                    "I'm very satisfied with the work we did with Dworin Consulting",
                    "I would recommend Dworin Consulting to a friend or colleague",
                    ],
                    choices: agreedisagree
                },
                {
                    type: "text-area",
                    label: "We'd love it if you would share a testimonial about our work together.",
                    category: "Testimonial"
                    
                },
                {
                    type: "checkbox",
                    label: "Dworin Consulting can use this testimonial on their website and in marketing materials.",
                    checked: true,
                    category: "TestimonialCheck"
                },
                {
                    type: "text-area",
                    label: "Is there anything we could do to improve on the service we delivered?",
                    category: "Improvement"
                },
                {
                    type: "checkbox",
                    label: "Dworin Consulting can contact me regarding the results of this survey",
                    category: "ImprovementCheck",
                    checked: true
                },
                {
                    type: "button",
                    label: "Submit Responses",
                    action: "nextandsubmit",
                    className: "btn-success"
                }
                
            ]},
            {
                label: "Thanks for taking our survey!",
                noNewPage: true,
                questions: [
                    {type: "text",
                    label: "We really appreciate your feedback, and if there's anymore you'd like to share, please let us know.  We hope to talk to you soon!"
                    
                }
                
            ]}
        ]};

categorydescriptions = 
[
    {   
        label: "Strategy",
        description: "A professional services firm can serve many different markets, but where you get into trouble is when you try to be all things to all people, or when diferent parts of your firm are working in different directions.  Your strategy score is less about evaluating what your strategy is than how aligned you are on it."
    },
    {   
        label: "Talent",
        description: "It's cliche, but in a professional services firm, your people really are your product.  That means you need to make sure you've got a ready pipeline of people coming in and moving through your organization to help you grow.  Your Talent rating measures how well your processes are in place to make sure that you're managing your people effectively."
    },
    {
        label: "Offerings",
        description: "Your offerings help you deliver value you to your clients efficiently and effectively.  They're the source of the value you provide.  But when you don't have the write system in place to execute them or keep them cutting eduge, you risk bleeding value and falling behind competitors."
    },
    {   
        label: "Relationships",
        description: "The relationships you have with your client are the lifeblood of your firm.  But most professionals spend their time where they're comfortable - doing the work - rather than getting out into the world and build to meet with new people and engage them.  "
    }
]
;