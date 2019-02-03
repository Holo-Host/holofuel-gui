// export type ListTransactionsResult = {
//   ledger: Ledger,
//   next: ListTransactionOptions,
//   over: ListTransactionsCoverage,
//   transactions: [
//     TxSummary: {
//       timestamp: DateTimeString,
//       state: string,
//       origin: Address,
//       event: Event,
//       adjustment: Adjustment
//     }
//   ]
// }

export const list_of_proposal_transactions = [{
  "ledger": {
    "Ledger": {
      "balance": 44,
      "credit": 40,
      "payable": 43,
      "receivable": 92
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-07-30",
      "until": "2018-08-26",
      "limit": 1
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 1,
      "count": 1,
      "total": 1
    }
  },
  "transactions": {
    "timestamp": "2018-05-29",
    "state": "TBD", // LOCATE ALL THE EVENT Actions that could lead to the "proposal" state and assign to various states...
    "origin": "1DbMSSijDUxcZiAShQLWXW4jQiTMfTeUeD",
    "adjust": {
      "Adjustment": {
        "balance": 27,
        "payable": 63,
        "receivable": 30
      }
    }
  },
  "transations": {
    "event": {
      "from": "14yeGBh7FBmZocXGRFcdVVyMJzBx6gXAbo",
      "request": "164nWJCJBTFV2noKaoMTvD59mzRXGvAjVk",
      "tx": {
        "to": "1BPCtb7nsnat2qJakxTY1Fw9R8eEDFAihs",
        "amount": "$6.53",
        "notes": "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
        "deadline": "2019-01-02"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 84,
      "credit": 90,
      "payable": 90,
      "receivable": 57
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-07-04",
      "until": "2018-02-25",
      "limit": 2
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 2,
      "count": 2,
      "total": 2
    }
  },
  "transactions": {
    "timestamp": "2018-03-24",
    "state": "Documentary",
    "origin": "1LtPkvL4wfWKybZgWq2SuR4hLrhfuiA8e2",
    "adjust": {
      "Adjustment": {
        "balance": 47,
        "payable": 51,
        "receivable": 60
      }
    }
  },
  "transations": {
    "event": {
      "from": "1BxwpPP8stcRXBRVQHqWcyH6DY5cycDDhZ",
      "request": "1D3tFG2NQQiKqDXfhwuQ44RcbHPnD9jG9j",
      "tx": {
        "to": "1AQiNhG6Bmyotfez5cCp7MLvEpjQ4sswfL",
        "amount": "$0.68",
        "notes": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.",
        "deadline": "2018-01-30"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 25,
      "credit": 12,
      "payable": 19,
      "receivable": 93
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-03-15",
      "until": "2019-01-22",
      "limit": 3
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 3,
      "count": 3,
      "total": 3
    }
  },
  "transactions": {
    "timestamp": "2018-08-02",
    "state": "Action|Crime|Drama|Thriller",
    "origin": "1Q1sjoPZm3vRixMscaCRiAu2Ha6FNJNT3z",
    "adjust": {
      "Adjustment": {
        "balance": 9,
        "payable": 28,
        "receivable": 23
      }
    }
  },
  "transations": {
    "event": {
      "from": "1JpeH66zm5dMdxdsB43iRNYooQmaUdLmmZ",
      "request": "1B7Ck7A4d5eYhmrUsXimq5zGWHhWpXDeJh",
      "tx": {
        "to": "12xNMRZ8EvZoY8RENG2NipG3UzT1NHGukB",
        "amount": "$0.79",
        "notes": "Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        "deadline": "2018-07-25"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 59,
      "credit": 31,
      "payable": 95,
      "receivable": 64
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-08-16",
      "until": "2018-10-07",
      "limit": 4
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 4,
      "count": 4,
      "total": 4
    }
  },
  "transactions": {
    "timestamp": "2018-11-14",
    "state": "Action|Comedy",
    "origin": "16fpq3FhpxHuHjUE68bP6MbT6SGJrrqmGh",
    "adjust": {
      "Adjustment": {
        "balance": 17,
        "payable": 12,
        "receivable": 69
      }
    }
  },
  "transations": {
    "event": {
      "from": "1696APi8VCW8wRton6LQ9FQzw2BrQKbcwu",
      "request": "132xZfofRdoo9yZGUWfdsESKkFCVgejHRX",
      "tx": {
        "to": "1HkyzSsxUKRyW9tD4H7dY3RACo5HG3mfLA",
        "amount": "$2.43",
        "notes": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.",
        "deadline": "2018-06-24"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 58,
      "credit": 93,
      "payable": 70,
      "receivable": 12
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-09-05",
      "until": "2018-10-25",
      "limit": 5
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 5,
      "count": 5,
      "total": 5
    }
  },
  "transactions": {
    "timestamp": "2018-02-18",
    "state": "Action|Crime|Drama|Thriller|IMAX",
    "origin": "1LUZu2EHtKpb6vFU3iX6kMqWcKyFbGpQQz",
    "adjust": {
      "Adjustment": {
        "balance": 1,
        "payable": 21,
        "receivable": 22
      }
    }
  },
  "transations": {
    "event": {
      "from": "12VgHteJ5we8v5BqerJSVA3HUN1bbmjMjA",
      "request": "1L8BteDyCFWUAzcN8n2kRwzYT11c2TqasB",
      "tx": {
        "to": "1PEoK8eFBmzT78fVdbFw6fTa5nA5DmSk39",
        "amount": "$6.93",
        "notes": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
        "deadline": "2018-06-12"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 85,
      "credit": 84,
      "payable": 38,
      "receivable": 75
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-09-30",
      "until": "2018-12-11",
      "limit": 6
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 6,
      "count": 6,
      "total": 6
    }
  },
  "transactions": {
    "timestamp": "2018-10-20",
    "state": "Comedy",
    "origin": "157XxppZpbdq1iLgZFAJKyJCCshkyj9kDJ",
    "adjust": {
      "Adjustment": {
        "balance": 32,
        "payable": 32,
        "receivable": 24
      }
    }
  },
  "transations": {
    "event": {
      "from": "1Dd7DKnRWTo68oSJa4knzkJu2UC7PcC3Ca",
      "request": "13y68mjTtN9Zw4nXWLYYWHUw9Uf4M17gLb",
      "tx": {
        "to": "1CZ4AMriWqRGhh5kRuR9pSwaFZbHDqzWEE",
        "amount": "$3.39",
        "notes": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.",
        "deadline": "2018-10-01"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 33,
      "credit": 21,
      "payable": 54,
      "receivable": 23
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-06-04",
      "until": "2018-04-03",
      "limit": 7
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 7,
      "count": 7,
      "total": 7
    }
  },
  "transactions": {
    "timestamp": "2018-06-13",
    "state": "Action|Comedy",
    "origin": "1HE3wwQomQMvW4tuUnVENSmPLF9ycJBxF1",
    "adjust": {
      "Adjustment": {
        "balance": 32,
        "payable": 60,
        "receivable": 82
      }
    }
  },
  "transations": {
    "event": {
      "from": "1xpCgzBJfJeHANzvkV7XCgjLk1RriW2Ea",
      "request": "12bLMmpYzif7bGDeYAZwvDWhXpjpuXYSq8",
      "tx": {
        "to": "1LptwSk5SCHosjnGjRv5fNHwcG9xBqHZv8",
        "amount": "$4.34",
        "notes": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
        "deadline": "2018-02-04"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 77,
      "credit": 46,
      "payable": 28,
      "receivable": 93
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-04-26",
      "until": "2018-10-29",
      "limit": 8
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 8,
      "count": 8,
      "total": 8
    }
  },
  "transactions": {
    "timestamp": "2018-10-19",
    "state": "Animation|Comedy",
    "origin": "13M1WZVEoT1MMDWtEzA3qvtWGzSCHowpAM",
    "adjust": {
      "Adjustment": {
        "balance": 30,
        "payable": 98,
        "receivable": 71
      }
    }
  },
  "transations": {
    "event": {
      "from": "1Bbu7nfCSCVeLGWV7czY5VFocaRr8jKwR1",
      "request": "1LwSmrYRmjHhDgM9EkGGNGJ4sRb5oQEnVo",
      "tx": {
        "to": "1PoWWsBZn679jFy1EG9oj8HygcCeXXTJof",
        "amount": "$5.91",
        "notes": "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        "deadline": "2018-05-11"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 23,
      "credit": 25,
      "payable": 46,
      "receivable": 28
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2018-06-19",
      "until": "2018-12-28",
      "limit": 9
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 9,
      "count": 9,
      "total": 9
    }
  },
  "transactions": {
    "timestamp": "2018-09-05",
    "state": "Horror",
    "origin": "1Q83qngstfwM9WFjejthtfHBAdLq5V6ism",
    "adjust": {
      "Adjustment": {
        "balance": 88,
        "payable": 60,
        "receivable": 14
      }
    }
  },
  "transations": {
    "event": {
      "from": "1AZ9Zuxg81F2E5h3TSqsLGpcTHdYgtaSXV",
      "request": "1Q7f2qH99tWjvvck3TZtfhyfkeNb6cmwSc",
      "tx": {
        "to": "14Y7Daa28jo6SyCJv7kDuUXE4mYJyZUaio",
        "amount": "$5.69",
        "notes": "Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.",
        "deadline": "2018-11-24"
      }
    }
  }
}, {
  "ledger": {
    "Ledger": {
      "balance": 43,
      "credit": 18,
      "payable": 54,
      "receivable": 60
    }
  },
  "next": {
    "ListTransactionOptions": {
      "state": "2019-01-04",
      "until": "2018-10-25",
      "limit": 10
    }
  },
  "over": {
    "ListTransactionsCoverage": {
      "first": 10,
      "count": 10,
      "total": 10
    }
  },
  "transactions": {
    "timestamp": "2018-09-05",
    "state": "Comedy|Drama|War",
    "origin": "1ByRcfn4zCYszfHoMLraMjnSnbh8KkD8Er",
    "adjust": {
      "Adjustment": {
        "balance": 14,
        "payable": 43,
        "receivable": 48
      }
    }
  },
  "transations": {
    "event": {
      "from": "1Bf77PhANMebDeidxcRvM89pBRBywKMRye",
      "request": "1DKKgA5W2ci5p7U2CgdgKdqcMiahSgBCta",
      "tx": {
        "to": "1wfULJdC7pnk9ipbiiWmtr6SBAAikPhsB",
        "amount": "$8.84",
        "notes": "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        "deadline": "2018-10-11"
      }
    }
  }
}]
